import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ChatService } from '../services/chat.service';
import moment = require('moment');

@Injectable()
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients = new Map();

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.authService.validateUserByToken(
      client.handshake.query.token,
    );
    if (user === 'Token is not valid') {
      client.emit('error', { status: 'error', msg: 'Invalid token' });
      return;
    }

    if (!this.clients.has(user.id)) {
      this.clients.set(user.id, client);
    }
    await this.usersService.updateUser(user.id, { onlineStatus: true });
    const allUsers = await this.usersService.getUsers();
    const userForMuteStatus = await this.usersService.getUser(user.id);
    const allMessages = await this.chatService.getMessages();

    client.broadcast.emit('users', allUsers);
    client.emit('users', allUsers);
    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    client.emit('previousMessages', allMessages);
  }

  async handleDisconnect(client: Socket) {
    const user = await this.authService.validateUserByToken(
      client.handshake.query.token,
    );
    if (user === 'Token is not valid') {
      client.emit('error', { status: 'error', msg: 'Invalid token' });
      return;
    }
    this.clients.delete(user.id);
    await this.usersService.updateUser(user.id, { onlineStatus: false });
    const allUsers = await this.usersService.getUsers();
    client.broadcast.emit('users', allUsers);
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    let msg = JSON.parse(newMessage);
    const allMessageByClient = await this.chatService.getMessagesByAuthor(
      msg.authorMessage,
    );
    const lastMsg = allMessageByClient[allMessageByClient.length - 1];
    const author = await this.usersService.getUserByNickName(msg.authorMessage);
    msg = Object.assign(msg, {
      timeMessage: moment().toString(),
      colorAuthorName: author.nickNameColor,
    });

    if (allMessageByClient.length === 0) {
      this.chatService.createNewMessage(msg);
      client.emit('chat', msg);
      client.broadcast.emit('chat', msg);
      return;
    }
    if (moment().diff(lastMsg.timeMessage) > 15000) {
      this.chatService.createNewMessage(msg);
      client.emit('chat', msg);
      client.broadcast.emit('chat', msg);
    } else {
      return;
    }
  }

  @SubscribeMessage('mute')
  async onMute(client, id) {
    const socketUserForMute = this.clients.get(id);
    const userForMuteStatus = await this.usersService.getUser(id);
    await this.usersService.updateUser(userForMuteStatus.id, {
      isMuted: !userForMuteStatus.isMuted,
    });
    const allUsers = await this.usersService.getUsers();
    client.emit('users', allUsers);
    if (socketUserForMute) {
      socketUserForMute.emit('mute', !userForMuteStatus.isMuted);
    }
  }

  @SubscribeMessage('ban')
  async onBan(client, id) {
    const socketUserForBan = this.clients.get(id);
    const userForBanStatus = await this.usersService.getUser(id);
    await this.usersService.updateUser(userForBanStatus.id, {
      isBaned: !userForBanStatus.isBaned,
    });
    const allUsers = await this.usersService.getUsers();
    client.emit('users', allUsers);
    if (socketUserForBan) {
      socketUserForBan.disconnect(true);
    }
  }
}
