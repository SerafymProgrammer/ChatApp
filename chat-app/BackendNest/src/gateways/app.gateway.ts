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

    if (!clientsByIsAdmin.has(userId)) {
      clientsByIsAdmin.set(userId, client);
    }

    client.join('default');

    const isExisted = await this.roomsUsersService.getRoomUser(
      constants.ID_DEFAULT_ROOM,
      userId,
    );
    if (!isExisted) {
      this.roomsUsersService.createRoomUser(constants.ID_DEFAULT_ROOM, userId);
    }

    await this.usersService.updateUser(userId, { onlineStatus: true });

    const userForMuteStatus = await this.usersService.getUser(userId);
    const allMessages = await this.chatService.getMessages();

    this.updateOnlineStatusUsers();

    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    client.emit('previousMessages', allMessages);
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
    const {textMessage, room} = newMessage; 
    if (!client.user || textMessage > 200) {
      return;
    }
    
    const roomName = room ? room : 'default';
    const isExistedRoom = await this.roomsService.getRoomByNameByMessages(roomName, client.user.userId);

    if(!isExistedRoom) {
      return;
    }

    const userMuteStatus = await this.usersService.getUser(client.user.userId);

    if (userMuteStatus.isMuted) {
      return;
    }

    const allMessageByClient = await this.chatService.getMessagesByAuthor(
      client.user.nickName,
    );
    if (isExistedRoom.messages.length) {
      const lastMsg = isExistedRoom.messages[isExistedRoom.messages.length - 1];

      if (moment().diff(lastMsg.timeMessage) < 15000) {
        return;
      }
    }
    const timeMessage = moment().toString();
    await this.chatService.createNewMessage(
      textMessage,
      client.user.nickName,
      client.user.nickNameColor,
      timeMessage,
    );
    this.server.to(roomName).emit('chat', {
      textMessage,
      authorMessage: client.user.nickName,
      timeMessage,
      colorAuthorName: client.user.nickNameColor,
    });
  }

  @SubscribeMessage('mute')
  async onMute(client, id) {
    if (!client.user.isAdmin) {
      return;
    }
    const socketUserForMute = this.clients.get(id);
    const userForMuteStatus = await this.usersService.getUser(id);

    this.guardMuteBanAdmin(client, socketUserForMute, userForMuteStatus);

    this.updateBanMuteStatusUsers(client, userForMuteStatus.userId, {
      isMuted: !userForMuteStatus.isMuted,
    });

    if (socketUserForMute) {
      socketUserForMute.emit('mute', !userForMuteStatus.isMuted);
    }
  }

  @SubscribeMessage('ban')
  async onBan(client, id) {
    if (!client.user.isAdmin) {
      return;
    }
    const socketUserForBan = this.clients.get(id);
    const userForBanStatus = await this.usersService.getUser(id);

    this.guardMuteBanAdmin(client, socketUserForBan, userForBanStatus);

    this.updateBanMuteStatusUsers(client, userForBanStatus.userId, {
      isBaned: !userForBanStatus.isBaned,
    });

    if (socketUserForBan) {
      socketUserForBan.disconnect(true);
    }
  }

  @SubscribeMessage('chatRoom')
  async onChatRoom(client, id) {
    if (!client.user.isAdmin) {
      return;
    }
    const socketUserForBan = this.clients.get(id);
    const userForBanStatus = await this.usersService.getUser(id);

    this.guardMuteBanAdmin(client, socketUserForBan, userForBanStatus);

    this.updateBanMuteStatusUsers(client, userForBanStatus.id, {
      isBaned: !userForBanStatus.isBaned,
    });

    if (socketUserForBan) {
      socketUserForBan.disconnect(true);
    }
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client,
    message: { sender: string; room: string; message: string },
  ) {
    this.server.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client, id) {
    const userForTalk = await this.usersService.getUser(id);
    if (!userForTalk) {
      return;
    }

    let newRoom;
    const roomName = client.user.name + userForTalk.nickName;
    const isExistedRoom = await this.roomsService.getRoomByName(roomName);

    if (!isExistedRoom) {
      newRoom = await this.roomsService.createNewRoom(roomName);
      await this.roomsUsersService.createRoomUser(
        newRoom.roomId,
        client.user.id,
      );
      await this.roomsUsersService.createRoomUser(
        newRoom.roomId,
        userForTalk.userId,
      );
    }

    // if (
    //   !this.rooms.has(roomName) ||
    //   !this.rooms.has(roomName)[client.user.userId] ||
    //   !this.rooms.has(roomName)[userForTalk.userId]
    // ) {
    //   this.rooms.set(roomName, {
    //     [client.user.userId]: client.user,
    //     [userForTalk.userId]: userForTalk,
    //   });
    // }
    client.join(roomName);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client, room: string) {
    // delete this.rooms.get(room)[client.user.userId];
    client.leave(room);
    //client.emit('leftRoom', room);
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
