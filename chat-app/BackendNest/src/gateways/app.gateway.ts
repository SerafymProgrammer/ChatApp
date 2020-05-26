import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
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
  @WebSocketServer() server;
  private clients = new Map();
  private admins = [];
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
      client.disconnect();
      return;
    }


    client.user = user;
    if (!this.clients.has(user.id)) {
      this.clients.set(user.id, client);
    }
    if (client.user.isAdmin) {
      this.admins.push(client);
    }
    await this.usersService.updateUser(user.id, { onlineStatus: true });
    const allUsers = await this.usersService.getUsers();
    const onlineUsers = await allUsers.filter((user)=>user.onlineStatus)
    const userForMuteStatus = await this.usersService.getUser(user.id);
    const allMessages = await this.chatService.getMessages();

    client.broadcast.emit('users', onlineUsers);
    client.emit('users', user.isAdmin ? allUsers : onlineUsers);
    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    client.emit('previousMessages', allMessages);
    this.admins.forEach(admin => {
     admin.emit('users', allUsers);
    }
  }
  
  async handleDisconnect(client: Socket) {
    if (client.user){
    this.clients.delete(client.user.id);
    }

    await this.usersService.updateUser(client.user.id, { onlineStatus: false });
    const allUsers = await this.usersService.getUsers();
    client.broadcast.emit('users', allUsers);
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    const allMessageByClient = await this.chatService.getMessagesByAuthor(client.user.nickName);
    const lastMsg = allMessageByClient[allMessageByClient.length - 1];

    if (allMessageByClient.length || moment().diff(lastMsg.timeMessage) < 15000) {
      return;
    }
    this.chatService.createNewMessage(newMessage);
      this.server.emit('chat', {
        timeMessage: moment().toString(),
        colorAuthorName: client.user.nickNameColor,
      });
  }

  @SubscribeMessage('mute')
  async onMute(client, id) {
    if (!client.user.isAdmin){
      return;
    }
    const socketUserForMute = this.clients.get(id);
    if(socketUserForMute.user.isAdmin){
      return;
    }
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
    if (!client.user.isAdmin){
      return;
    }
    const socketUserForBan = this.clients.get(id);
    if(socketUserForBan.user.isAdmin){
      return;
    }
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
