import { Component, OnInit } from '@angular/core';
import * as Twilio from '@twilio/conversations'
import { MyServiceService } from 'src/app/shared/my-service.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  response: any;

  constructor(private ms:MyServiceService) { }

  messages:any[]=[];
  ngOnInit(): void {
  this.ms.getActiveUser().subscribe((res:Twilio.Conversation)=>{
    console.log(res);
    this.response=res.getMessages();
    res.on('messageAdded',(message: any)=>{
      this.messages=[...this.response,message];
    });
  });
  }

}
