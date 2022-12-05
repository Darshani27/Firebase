import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { CONSTANTS } from 'src/app/constants';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-question-mapping',
  templateUrl: './question-mapping.component.html',
  styleUrls: ['./question-mapping.component.css']
})
export class QuestionMappingComponent implements OnInit{
  displayedColumns: string[] = ['section','name','answer'];
  data:any;
  result: any[]=[];
  section: any;
  questionForm:FormGroup={} as any;
  answers: any;
  savedData: ({ questionId: string; answer: string; bool?: undefined; multi?: undefined; } | { questionId: string; bool: boolean; answer?: undefined; multi?: undefined; } | { questionId: string; multi: { id: number; }[]; answer?: undefined; bool?: undefined; })[] = [];

  constructor(private dataService:DataService,private fb:FormBuilder) { }
  

  ngOnInit(): void {
    this.retrieveData();
    this.questionForm=this.fb.group({
      text:this.fb.array([]),
      select:this.fb.array([]),
      radio:this.fb.array([]),
      shortText:this.fb.array([])
    });
  }
  onInputChanges(event:any,i:number) : any{
   this.questionForm.value.text[i]={answer:event.target.value};
   this.questionForm.value.shortText[i]={answer:event.target.value};
  }
  retrieveData() {
    this.dataService.getData().subscribe((res: any) => {
      this.data = res || [];
      if (this.data) {
        
        this.result = this.data.result;

        this.answers = this.result.map((r: any) => {
          return r.answer
        });
          this.answers.map((r: any, index: any) => {
            
            if(r.originalName!=null && this.result.filter((r:any)=>r.responseType.name==CONSTANTS.LONG_TEXT))
            {
              const texts=this.fb.group({
                answer:[this.answers[index].originalName]
              });
            this.text.push(texts);
            }
            else if(r.bool !=null  && this.result.filter((r:any)=>r.responseType.name==CONSTANTS.BOOL) )
            {
              const radios=this.fb.group({
                bool:[this.answers[index].bool]
              });
              this.radio.push(radios);
            }
            else if(r.bool !=null  && this.result.filter((r:any)=>r.responseType.name==CONSTANTS.MULTI_SELECT ))
            {
              const selects=this.fb.group({
                select:[this.answers[index].name]
              });
              this.select.push(selects);
            }
            else if(r.bool !=null  && this.result.filter((r:any)=>r.responseType.name==CONSTANTS.SHORT_TEXT) )
            {
              const shortTexts=this.fb.group({
                answer:[this.answers[index].originalName]
              });
              this.shortText.push(shortTexts);
            }
          });
        
      }
    });
  }
  get text()
  {
    return this.questionForm.controls['text'] as FormArray;
  }
  get select()
  {
    return this.questionForm.controls['select'] as FormArray;
  }
  get radio()
  {
    return this.questionForm.controls['radio'] as FormArray;
  }
  get shortText()
  {
    return this.questionForm.controls['shortText'] as FormArray;
  }
  change(event:any,i:number)
  {
    this.questionForm.value.select[i]={id:event.value};
    console.log(this.questionForm.value.select);
    console.log(this.savedData);
    
    
  }
  radioChange(event:any,index:number)
  {
    this.questionForm.value.radio[index]={bool:event.value};
  }

  saveFormData()
  {
  
    this.savedData=[]
    const longTextQuestion = this.result.filter((r: any) => r.responseType.name == CONSTANTS.LONG_TEXT);
    const longTextQuestionIds = longTextQuestion.map((r: any) => {
      return r.id;
    })
    const boolQuestion = this.result.filter((r: any) => r.responseType.name == CONSTANTS.BOOL);
    const boolQuestionIds=boolQuestion.map((r:any)=>{
      return r.id;
    });
    const multiQuestion=this.result.filter((r:any)=>r.responseType.name==CONSTANTS.MULTI_SELECT);
    const multiQuestionIds=multiQuestion.map((r:any)=>{
      return r.id;
    })
    
    const singleQuestion=this.result.filter((r:any)=>r.responseType.name==CONSTANTS.SINGLE_SELECT);
    const singleQuestionIds=singleQuestion.map((r:any)=>{
      return r.id;
    })
    const shortTextQuestion=this.result.filter((r:any)=>{
      return r.responseType.name==CONSTANTS.SHORT_TEXT;
    });
    const shortTextQuestionIds=shortTextQuestion.map((r:any)=>{
      return r.id;
    });
     this.answers.map((r:any,index:any)=>{
      const data={
        questionId:this.answers[index].questionId,
        answer:this.questionForm.value.text[index]?.answer,
      }
      if(longTextQuestionIds.includes(this.answers[index].questionId))
      {
        this.savedData.push(data as any);
      }

      if(boolQuestionIds.includes(this.answers[index].questionId))
      {
        this.savedData.push({questionId:this.answers[index].questionId,
          bool:this.questionForm.value.radio[index]?.bool
        } as any)
      }
      if(multiQuestionIds.includes(this.answers[index].questionId) || singleQuestionIds.includes(this.answers[index].questionId) )
      {
        const questionId=this.answers[index].questionId;
        this.savedData.push({
          questionId:this.answers[index].questionId,
          response:this.questionForm.value.select[questionId]
        } as any);
        console.log(this.savedData);
        
      }
      if(shortTextQuestionIds.includes(this.answers[index].questionId))
      {
        this.savedData.push({
          questionId:this.answers[index].questionId,
          answer:this.questionForm.value.shortText[index]?.answer
        } as any);
      }
     });
 
     console.log(this.savedData);
    
    
  }

}
