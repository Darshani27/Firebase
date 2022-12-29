import { Component } from '@angular/core';



  import * as Twilio from '@twilio/conversations';
import { Client} from '@twilio/conversations';
import { MyServiceService } from './shared/my-service.service';
import { ConversationComponent } from '../../../Firebase/src/app/component/conversation/conversation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-firebase';
  formValue:string='';
  activeUser:any;
  token:string='';

  constructor(private ms:MyServiceService)
  {

  }
  async getAccessToken()
  {

    const client=new Client(this.token);
    const newConversation=await client.createConversation({ uniqueName: 'chat' });
    const joinedConversation= await newConversation.join();
    await joinedConversation.add('user1').catch((err:any)=>{
      console.log(err);
    });
    await joinedConversation.add('user2').catch((err:any)=>{
      console.log(err);
    });
    this.ms.setActiveUser(joinedConversation);
    // this.activeUser.set(joinedConversation);
    // client.connectionState.concat(joinedConversation);
    }
}
