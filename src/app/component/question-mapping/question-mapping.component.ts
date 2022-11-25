import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-question-mapping',
  templateUrl: './question-mapping.component.html',
  styleUrls: ['./question-mapping.component.css']
})
export class QuestionMappingComponent implements OnInit {
  displayedColumns: string[] = ['section','name','answer'];
  data:any;
  result: any[]=[];
  section: any;
  questionForm:FormGroup={} as any;
  answers: any;


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.retrieveData();
    this.questionForm=new FormGroup({
      'text':new FormControl(),
      'select':new FormControl(),
      'radio':new FormControl(),
      'shortText':new FormControl()
    });
   
  }
  retrieveData() {
    this.dataService.getData().subscribe((res:any)=>{
      this.data=res||[];
      if(this.data)
      {
        this.result=this.data.result;
        console.log(this.result);
        
        const answerVal = this.result.map((result: any) => {
          return result.answer.originalName;
        })

         this.questionForm.patchValue({
         'text': answerVal
    }); 
      }
    });
    // console.log(this.result);
    
  }

  saveFormData()
  {

  }

}
