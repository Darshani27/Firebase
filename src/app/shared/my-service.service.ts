import { Injectable } from '@angular/core';
import * as Twilio from '@twilio/conversations';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  activeUser:any=new BehaviorSubject('');

  setActiveUser(data:any)
  {
    this.activeUser.next(data);
  }

  getActiveUser()
  {
    return this.activeUser;
  }
  constructor() { }
}
