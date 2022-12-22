import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/shared/chat-service.service';
import { Message } from 'src/app/models/message.model';
import { Observable, reduce } from 'rxjs';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
  export class ChatDialogComponent implements OnInit {

 value:any;
//  messages:any[]=[];
  messages!: Observable<Message[]>;
 formValue:any;
  constructor(public chat:ChatServiceService) { }

 
  ngOnInit(): void {
    // this.chat.conversation.subscribe((val) => {
    //   this.messages = this.messages.concat(val);
    // });
    // let message=new Message('Hi','user');
    // this.messages.push(message);
    // this.messages = this.chat.conversation.asObservable().pipe(reduce((acc: string | any[], val: any) => acc.concat(val) ));
  }
  sendMessage()
  {
    // this.chat.getBotAnswer(this.value);
    // this.chat.converse(this.formValue);
    this.formValue = '';
    this.value = '';
    // let message=new Message(this.formValue,'user');
    // this.messages.push(message);
    // this.chat.sendMessage(this.formValue).subscribe((res:any)=>{
    //   console.log(res);
    // },(err)=>{
    //   console.log(err);
      
    // })
  }

}
