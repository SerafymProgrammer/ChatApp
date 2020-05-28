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

  constructor(
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
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

    if (!clientsByIsAdmin.has(decodedUser.id)) {
      clientsByIsAdmin.set(decodedUser.id, client);
    }

    await this.usersService.updateUser(decodedUser.id, { onlineStatus: true });

    const userForMuteStatus = await this.usersService.getUser(decodedUser.id);
    const allMessages = await this.chatService.getMessages();

    this.updateOnlineStatusUsers();

    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    client.emit('previousMessages', allMessages);
  }

  async handleDisconnect(client: ClientWebSocket) {
    if (client.user) {
      (!client.user.isAdmin ? this.clients : this.admins).delete(
        client.user.id,
      );
      await this.usersService.updateUser(client.user.id, {
        onlineStatus: false,
      });
    }
    this.updateOnlineStatusUsers();
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    if (!client.user || newMessage.length > 200) {
      return;
    }

    const userMuteStatus = await this.usersService.getUser(client.user.id);

    if (userMuteStatus.isMuted) {
      return;
    }

    const allMessageByClient = await this.chatService.getMessagesByAuthor(
      client.user.nickName,
    );
    if (allMessageByClient.length) {
      const lastMsg = allMessageByClient[allMessageByClient.length - 1];

      if (moment().diff(lastMsg.timeMessage) < 15000) {
        return;
      }
    }
    const timeMessage = moment().toString();
    await this.chatService.createNewMessage(
      newMessage,
      client.user.nickName,
      client.user.nickNameColor,
      timeMessage,
    );
    this.server.emit('chat', {
      textMessage: newMessage,
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

    this.updateBanMuteStatusUsers(client, userForMuteStatus.id, {
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

    this.updateBanMuteStatusUsers(client, userForBanStatus, {
      isBaned: !userForBanStatus.isBaned,
    });

    if (socketUserForBan) {
      socketUserForBan.disconnect(true);
    }
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
