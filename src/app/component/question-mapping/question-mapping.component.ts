import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  texts!: FormGroup<{ text: FormControl<any>; }>;


  constructor(private dataService:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.retrieveData();
    this.questionForm=this.fb.group({
      text:[],
      radio:[],
      select:[],
      shortText:[]
     
    });
   
  }
  det(): any {
    this.answers.map((r:any,index:any)=>{
     
    })
  }
  // get ansques()
  // {
  //   return this.questionForm?.controls["ansques"] as FormArray;
  // }
  retrieveData() {
    this.dataService.getData().subscribe((res: any) => {
      this.data = res || [];
      if (this.data) {
        this.result = this.data.result;
        this.answers = this.result.map((r: any) => {
          return r.answer
        });
        this.answers.map((r: any, index: any) => {
          // this.texts = this.fb.group({
          //   text: [this.answers[index]?.originalName]
          // });
          // this.text.push(this.texts)
          // this.questionForm.patchValue({
          //   text:[this.answers[index]?.originalName]
          // })
          this.dataService.getSingleData(this.answers[index].questionId).subscribe((x:any)=>{
            console.log(x);
            this.questionForm.patchValue([
              {
              text:x.answer.originalName
                
              }

            ]
            );
          });
        //   const a=this.fb.group({
        //     text:[this.answers[index].originalName],
        //     select:[],
        //     radio:[],
        //     shortText:[]
        //   });
        //   this.ansques.push(a)
        });
       
      }
    });
    // console.log(this.result);
    
  }

  saveFormData()
  {
  
    const data=[{
      questionId:'',
      answer:''
    },{
      questionId:'',
      bool:false,
    },
  {
    questionId:'',
    multi:[{id:1},{id:2}]
  }]
     
    
 
    // this.questionForm.value
    console.log(this.questionForm.value.text);
    
  }

}
