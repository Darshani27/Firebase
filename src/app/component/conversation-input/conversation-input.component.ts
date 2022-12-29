import { Component, OnInit } from '@angular/core';
import * as Twilio  from '@twilio/conversations';
import { MyServiceService } from 'src/app/shared/my-service.service';

@Component({
  selector: 'app-conversation-input',
  templateUrl: './conversation-input.component.html',
  styleUrls: ['./conversation-input.component.css']
})
export class ConversationInputComponent implements OnInit {
  message:string='';
  response:any;
  constructor(private ms:MyServiceService) { }

  ngOnInit(): void {
  }

  handleKeyDown(event:any)
  {
    this.message=event.target.value;
    if(event.key==='Enter')
    {
      this.ms.getActiveUser().subscribe((res:Twilio.Conversation)=>{
        this.response=res;
        this.response.sendMessage(this.message);
        this.message='';
      })
    }
  }

}
