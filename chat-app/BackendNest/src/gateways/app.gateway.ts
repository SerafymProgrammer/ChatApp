import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,

} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.model';
import { User } from '../models/users.model';
import moment = require('moment');

@Injectable()
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  @WebSocketServer()
  socket: Socket;
  clients = new Map();

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly chatService: ChatService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.authService.validateUserByToken(
      client.handshake.query.token,
    );
    if (user == Error) {
      client.emit('error', user);
      return;
    }

    if (!this.clients.has(user.id)) {
      this.clients.set(user.id, client);
    }
     console.log('connect')
    await this.usersService.updateUser(user.id, {onlineStatus: true});
    const allUsers = await this.usersService.getUsers();
    const onlineUsers = allUsers.filter(user => user.onlineStatus === true);
    client.broadcast.emit('users', allUsers);
    client.emit('users', user.isAdmin ? allUsers : onlineUsers);
    const userForMuteStatus = await this.usersService.getUser(user.id);
    client.emit('initialMuteStatus', userForMuteStatus.isMuted);
    const allMessages = await this.chatService.getMessages();  
    client.emit('previousMessages', allMessages);
  }

  async handleDisconnect(client: Socket) {
    const user = await this.authService.validateUserByToken(
      client.handshake.query.token,
    );
    console.log('discon');
    user.onlineStatus = false;
    await this.usersService.updateUser(user.id, {onlineStatus: false});
    const allUsers = await this.usersService.getUsers();
    const onlineUsers = allUsers.filter(user => user.onlineStatus === true);

    this.socket.emit('users', onlineUsers);
  }

  @SubscribeMessage('chat')
  async onChat(client, newMessage) {
    let msg = JSON.parse(newMessage);
    msg = Object.assign(msg, {timeMessage: moment().toString()});
    const allMessageByClient = await this.chatService.getMessagesByAuthor(
      msg.authorMessage,
    );
    if (allMessageByClient.length === 0) {
      this.chatService.createNewMessage(msg);
      client.broadcast.emit('chat', msg);
    }
    const lastMsg = allMessageByClient[allMessageByClient.length - 1];
    if (moment().diff(lastMsg.timeMessage) > 15000) {
      this.chatService.createNewMessage(msg);
      client.broadcast.emit('chat', msg);
    } else {
      return;
    }
  }

  @SubscribeMessage('mute')
  async onMute(client, id) {
  try {
    const socketUserForMute = this.clients.get(id);
    const userForMuteStatus = await this.usersService.getUser(id);
    await this.usersService.updateUser(userForMuteStatus.id, {isMuted: !userForMuteStatus.isMuted});
    socketUserForMute.emit('mute', !userForMuteStatus.isMuted);
    } 
    catch (err) {
      console.log(err);
    }
  }

  @SubscribeMessage('ban')
  async onBan(client, id) {
    const socketUserForBan = this.clients.get(id);
    const userForBanStatus = await this.usersService.getUser(id);

    
    await this.usersService.updateUser(userForBanStatus.id, {isBaned: !userForBanStatus.isBaned} );

    socketUserForBan.disconnect(true);
  }
}
