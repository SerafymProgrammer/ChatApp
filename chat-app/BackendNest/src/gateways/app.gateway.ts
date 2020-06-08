import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ChatService } from '../services/chat.service';
import { RoomsUsersService } from '../services/roomsUsers.service';
import { RoomsService } from '../services/rooms.service';
import moment = require('moment');
import jwtDecode = require('jwt-decode');
import { ClientWebSocket } from '../interfaces/inrterfaces';
import * as constants from '../constants/constants';
import { Messages } from '../models/message.model';
import { Rooms } from '../models/rooms.model';
import { Users } from '../models/users.model';

@Injectable()
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  private clients = new Map();
  private admins = new Map();
  private rooms = new Map();

  constructor(
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
    private readonly roomsUsersService: RoomsUsersService,
    private readonly roomsService: RoomsService,
  ) {}

  async handleConnection(client: ClientWebSocket, ...args: any[]) {
    const decodedUser = jwtDecode(client.handshake.query.token);

    if (!decodedUser) {
      client.emit('error', constants.TOKEN_ERROR);
      client.disconnect();
      return;
    }

    client.user = decodedUser;

    const clientsByIsAdmin = !decodedUser.isAdmin ? this.clients : this.admins;
    const { userId } = decodedUser;
    const userWithRooms = await this.usersService.getUserByThat({
      where: { userId },
      include: [{ model: Rooms, include: [Messages, Users] }],
    });

    if (!clientsByIsAdmin.has(userId)) {
      clientsByIsAdmin.set(userId, client);
    }

    const isExisted = await this.roomsUsersService.getRoomUser(
      constants.ID_DEFAULT_ROOM,
      userId,
    );
    if (!isExisted) {
      await this.roomsUsersService.createRoomUser(
        constants.ID_DEFAULT_ROOM,
        userId,
      );
    }

    await this.usersService.updateUser(userId, { onlineStatus: true });

    this.updateOnlineStatusUsers();

    client.emit('rooms', userWithRooms.rooms);
    client.emit('initialMuteStatus', userWithRooms.isMuted);
    this.joinToDefaultRoom(client);
  }

  async handleDisconnect(client: ClientWebSocket) {
    client.leave('default');
    const { isAdmin, userId } = client.user;
    if (client.user) {
      (!isAdmin ? this.clients : this.admins).delete(userId);

      await this.usersService.updateUser(userId, {
        onlineStatus: false,
      });
    }
    this.updateOnlineStatusUsers();
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    const { textMessage, room } = newMessage;
    if (!client.user || textMessage > 200) {
      return;
    }

    const isExistedRoom = await this.roomsService.getRoomByThat({
      where: {
        roomId: room.roomId,
      },
    });

    if (!isExistedRoom) {
      return;
    }

    const userWithMessagesAndMuteStatus = await this.usersService.getUserByThat(
      {
        where: { userId: client.user.userId },
        include: [{model: Messages, where: {roomId: isExistedRoom.roomId}, required: false}],
      },
    );

    console.log('sdfsfddfgfdg', userWithMessagesAndMuteStatus)

    if (userWithMessagesAndMuteStatus.isMuted) {
      return;
    }
    if ( isExistedRoom.roomId === constants.ID_DEFAULT_ROOM) {
      if (userWithMessagesAndMuteStatus.messages?.length) {
        const lastMsg =
          userWithMessagesAndMuteStatus.messages[
            userWithMessagesAndMuteStatus.messages.length - 1
          ];
        if (moment().diff(lastMsg.timeMessage) < 15000) {
          return;
        }
      }
    }

    const timeMessage = moment().toString();
    await this.chatService.createNewMessage(
      textMessage,
      client.user.nickName,
      client.user.nickNameColor,
      timeMessage,
      isExistedRoom.roomId,
      client.user.userId,
    );
    this.server.to(room.roomName).emit('chat', {
      textMessage,
      authorMessage: client.user.nickName,
      timeMessage,
      colorAuthorName: client.user.nickNameColor,
    });
  }

  @SubscribeMessage('mute')
  async onMute(client, userId) {
    if (!client.user.isAdmin) {
      return;
    }
    const socketUserForMute = this.clients.get(userId);
    const userForMuteStatus = await this.usersService.getUserByThat({
      where: { userId },
    });

    this.guardMuteBanAdmin(client, socketUserForMute, userForMuteStatus);

    this.updateBanMuteStatusUsers(client, userForMuteStatus.userId, {
      isMuted: !userForMuteStatus.isMuted,
    });

    if (socketUserForMute) {
      socketUserForMute.emit('mute', !userForMuteStatus.isMuted);
    }
  }

  @SubscribeMessage('ban')
  async onBan(client, userId) {
    if (!client.user.isAdmin) {
      return;
    }
    const socketUserForBan = this.clients.get(userId);
    const userForBanStatus = await this.usersService.getUserByThat({
      where: { userId },
    });

    this.guardMuteBanAdmin(client, socketUserForBan, userForBanStatus);

    this.updateBanMuteStatusUsers(client, userForBanStatus.userId, {
      isBaned: !userForBanStatus.isBaned,
    });

    if (socketUserForBan) {
      socketUserForBan.disconnect(true);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client, userId) {
    if (userId === constants.NAME_DEFAULT_ROOM) {
      this.joinToDefaultRoom(client);
      return;
    }

    const userRequester = await this.usersService.getUserByThat({
      where: { userId: client.user.userId },
      include: [{ model: Rooms, include: [Users, Messages] }],
    });

    const userForTalk = await this.usersService.getUserByThat({
      where: { userId },
      include: [{ model: Rooms, include: [Users, Messages] }],
    });

    if (!userForTalk) {
      return;
    }

    let isExistedRoom;
    userRequester.rooms.forEach(room => {
      const findedRoomById = userForTalk.rooms.find(
        elem => elem.roomId === room.roomId,
      );
      if (findedRoomById && findedRoomById.roomId !== 1) {
        isExistedRoom = room;
      }
    });

    if (!isExistedRoom) {
      const newRoom = await this.roomsService.createNewRoom(
        client.user.nickName + userForTalk.nickName,
      );
      await this.roomsUsersService.createRoomUser(
        newRoom.roomId,
        client.user.userId,
      );
      await this.roomsUsersService.createRoomUser(
        newRoom.roomId,
        userForTalk.userId,
      );
      this.joinUserInRoomAfterValidate(client, userId, newRoom);
    }

    this.joinUserInRoomAfterValidate(client, userId, isExistedRoom);
  }

  async joinUserInRoomAfterValidate(client, userForTalkId, room) {
    const userRequester = await this.usersService.getUserByThat({
      where: { userId: client.user.userId },
      include: [{ model: Rooms, include: [Users, Messages] }],
    });
    const userForTalk = await this.usersService.getUserByThat({
      where: { userId: userForTalkId },
      include: [{ model: Rooms, include: [Users, Messages] }],
    });

    client.emit('rooms', userRequester.rooms);
    client.broadcast.emit('rooms', userForTalk.rooms);

    client.emit('previousMessages', room.messages);

    client.emit('focusRoom', room);
    client.join(room.roomName);
  }

  async joinToDefaultRoom(client) {
    const defaultRoom = await this.roomsService.getRoomByThat({
      where: { roomId: constants.ID_DEFAULT_ROOM },
      include: [Messages],
    });

    client.emit('previousMessages', defaultRoom.messages);
    client.emit('focusRoom', defaultRoom);
    client.join(defaultRoom.roomName);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client, room: string) {
    client.leave(room);
  }

  guardMuteBanAdmin(client, socket, user) {
    if ((!socket && !user) || user.isAdmin) {
      client.emit('error', constants.ERROR_MUTE_BAN_REQ);
      client.disconnect();
      return true;
    }
    return false;
  }

  async updateBanMuteStatusUsers(client, id, byThat) {
    await this.usersService.updateUser(id, byThat);
    const allUsers = await this.usersService.getUsers();
    client.emit('users', allUsers);
  }

  async updateOnlineStatusUsers() {
    const allUsers = await this.usersService.getUsers();
    const onlineUsers = await allUsers.filter(user => user.onlineStatus);

    for (const admin of this.admins.values()) {
      admin.emit('users', allUsers);
    }

    for (const user of this.clients.values()) {
      user.emit('users', onlineUsers);
    }
  }
}
