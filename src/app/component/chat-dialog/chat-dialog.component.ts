import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/shared/chat-service.service';



@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
  export class ChatDialogComponent implements OnInit {

 value:any;
 messages:any;
  constructor(public chat:ChatServiceService) { }

  ngOnInit(): void {
    this.chat.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }
  sendMessage()
  {
    this.chat.getBotAnswer(this.value);
    this.value = '';

  }

}
