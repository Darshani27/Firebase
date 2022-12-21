import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';








@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  // readonly token = environment.dialogflow.client_id;
  // readonly client = new ApiAiClient({ accessToken: this.token });

  // conversation = new BehaviorSubject<Message[]>([]);
  // constructor(private http:HttpClient) { }

  // //  // Sends and receives messages via DialogFlow
  //  converse(msg: string) {
  //   const userMessage = new Message(msg, 'user');
  //   this.update(userMessage);

  //   return this.client.textRequest(msg).then((res :any) => {
  //     const speech = res.result.fulfillment.speech;
  //     const botMessage = new Message(speech, 'bot');
  //     this.update(botMessage);
  //   });
  }

  // Adds message to source
  // update(msg: Message) {
  //   this.conversation.next([msg]);
  // }
  // conversation = new Subject<Message[]>();
  
  // messageMap = {
  //   "Hi": "Hello",
  //   "Who are you": "My name is Agular Bot",
  //   "What is Angular": "Angular is the best framework ever",
  //   "default": "I can't understand. Can you please repeat"
  // } as any;

  // getBotAnswer(msg: string) {
  //   const userMessage = new Message('user', msg);  
  //   this.conversation.next([userMessage]);
  //   const botMessage = new Message('bot', this.getBotMessage(msg));
    
  //   setTimeout(()=>{
  //     this.conversation.next([botMessage]);
  //   }, 1500);
  // }

  // getBotMessage(a :any): any{
  //   let answer = this.messageMap[a];
  //   return answer || this.messageMap['default'];
  // }
  // url="https://api.dialogflow.com/v1/query";
  // accessToken="39f436c5827c6cb1cd6fc38a19e1c999d7d3f684";
  

  // public sendMessage(msg:string)
  // {
  //   let data={
  //     lang:"en",
  //     sessionId:"1234",
  //     query:msg
  //   }
  //   let header=new Headers() as any;
  //   header.append("Authorization",`Bearer ${this.accessToken}`);

  //   return this.http.post(this.url,data,{headers:header}).pipe(map((res:any)=>{
  //     return res.json()
  //   }))
  // }


