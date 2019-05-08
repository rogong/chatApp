import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  receiver: string;
  user: any;
  message: string;
  receiverData: any;
  messageArr = [];
  socket: any;

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
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
        });
    }
  }

  getUserByUsername(name) {
    this.userService.getUserByUserName(name)
      .subscribe(data => {
        this.receiverData = data.result;
        this.loadAllMessages(this.user._id, data.result._id);
      });
  }

}
