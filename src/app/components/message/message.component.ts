import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import _ from 'lodash';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() users;
  socketUrl = environment.baseUrlSocket;
  receiver: string;
  user: any;
  message: string;
  receiverData: any;
  messageArr = [];
  socket: any;
  typingMessage;
  typing = false;
  isOnline = false;

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.socket = io(this.socketUrl);
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.getUserByUsername(this.receiver);
      this.socket.on('refreshPage', (data) => {
        this.getUserByUsername(this.receiver);
      });
    });

    this.socket.on('is_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.users.currentValue.length > 0) {
      const result = _.indexOf(changes.users.currentValue, this.receiver);
      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    }
  }
  ngAfterViewInit() {
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };
    // tslint:disable-next-line:align
    this.socket.emit('join chat', params);

  }



  loadAllMessages(senderId, receiverId) {
    this.msgService.getAllMessages(senderId, receiverId)
      .subscribe(data => {
        this.messageArr = data.messages.message;
      });
  }

  sendMessage() {
    if (this.message) {
      this.msgService
        .sendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(data => {
          this.socket.emit('refresh', {});
          this.message = '';
        }, err => console.log(err));
    }
  }

  getUserByUsername(name) {
    this.userService.getUserByUserName(name)
      .subscribe(data => {
        this.receiverData = data.result;
        this.loadAllMessages(this.user._id, data.result._id);
      });
  }

  isTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiver
    });
  }

}
