import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';





export class Message {
  constructor(public content: string, public sentBy: string) {}
}


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  // readonly token = environment.dialogflow.angularBot;
  // readonly client = new ApiAiClient({ accessToken: this.token });

  // conversation = new BehaviorSubject<Message[]>([]);
  // constructor() { }

  //  // Sends and receives messages via DialogFlow
  //  converse(msg: string) {
  //   const userMessage = new Message(msg, 'user');
  //   this.update(userMessage);

  //   return this.client.textRequest(msg).then((res :any) => {
  //     const speech = res.result.fulfillment.speech;
  //     const botMessage = new Message(speech, 'bot');
  //     this.update(botMessage);
  //   });
  // }

  // Adds message to source
  // update(msg: Message) {
  //   this.conversation.next([msg]);
  // }
  conversation = new Subject<Message[]>();
  
  messageMap = {
    "Hi": "Hello",
    "Who are you": "My name is Agular Bot",
    "What is Angular": "Angular is the best framework ever",
    "default": "I can't understand. Can you please repeat"
  } as any;

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(a :any): any{
    let answer = this.messageMap[a];
    return answer || this.messageMap['default'];
  }
}

