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
    const decodedUser = jwtDecode(client.handshake.query.token,);
    if (!decodedUser) {
      client.emit('error', { status: 'error', msg: 'Invalid token' });
      client.disconnect();
      return;
    }

    client.user = decodedUser;
    let usersByIsAdmin =  (decodedUser.isAdmin ? this.clients : this.admins);
    if (!usersByIsAdmin.has(decodedUser.id)) {
      usersByIsAdmin.set(decodedUser.id, client);
    }

    await this.usersService.updateUser(decodedUser.id, { onlineStatus: true });

    const allUsers = await this.usersService.getUsers();
    const onlineUsers = await allUsers.filter((user)=>user.onlineStatus)
    const userForMuteStatus = await this.usersService.getUser(decodedUser.id);
    const allMessages = await this.chatService.getMessages();

    for (let admin of this.admins.values()) {
      admin.emit('users', allUsers);
    }
    for (let user of this.clients.values()) {
      user.emit('users', onlineUsers);
    }

    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    client.emit('previousMessages', allMessages);
  }
  
  async handleDisconnect(client: ClientWebSocket) {
    (client.user.isAdmin ? this.clients : this.admins).delete(client.user.id);
    await this.usersService.updateUser(client.user.id, { onlineStatus: false });

    const allUsers = await this.usersService.getUsers();
    const onlineUsers = await allUsers.filter((user)=>user.onlineStatus)

    for (let admin of this.admins.values()) {
      admin.emit('users', allUsers);
    }

    for (let user of this.clients.values()) {
      user.emit('users', onlineUsers);
    }
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    const allMessageByClient = await this.chatService.getMessagesByAuthor(client.user.nickName);
    const lastMsg = allMessageByClient[allMessageByClient.length - 1];

    if (allMessageByClient.length || moment().diff(lastMsg.timeMessage) < 15000) {
      return;
    }

    await this.chatService.createNewMessage(newMessage, client.user.nickName, client.user.nickNameColor);
    this.server.emit('chat', {
      textMessage: newMessage,
      authorMessage: client.user.nickName,
      timeMessage: moment().toString(),  // ?
      colorAuthorName: client.user.nickNameColor,
    });
  }

  @SubscribeMessage('mute')
  async onMute(client, id) {
    if (!client.user.isAdmin){
      return;
    }
    const socketUserForMute = this.clients.get(id);
    const userForMuteStatus = await this.usersService.getUser(id);
    if(!socketUserForMute&&!userForMuteStatus || userForMuteStatus.isAdmin) {
      client.emit('error', { status: 'error', msg: 'User does not exist or he is admin' });
      client.disconnect();
      return;
    }
    
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
    const userForBanStatus = await this.usersService.getUser(id);
    if(!socketUserForBan&&!userForBanStatus || userForBanStatus.isAdmin) {
      client.emit('error', { status: 'error', msg: 'User does not exist' });
      client.disconnect();
      return;
    }
    
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
