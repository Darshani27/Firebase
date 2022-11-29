import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  texts!: FormGroup<{ longtext: FormControl<any>; }>;
  @ViewChild('text')
  textRef!: ElementRef;
  savedData: ({ questionId: string; answer: string; bool?: undefined; multi?: undefined; } | { questionId: string; bool: boolean; answer?: undefined; multi?: undefined; } | { questionId: string; multi: { id: number; }[]; answer?: undefined; bool?: undefined; })[] = [];

  constructor(private dataService:DataService,private fb:FormBuilder) { }
  // ngOnChanges(changes: SimpleChanges): void {
  //   const a=this.questionForm.get('text') as FormArray;
  //   console.log(this.questionForm.get('text') as FormArray );
  //    console.log(a.statusChanges.subscribe(x=>x));
  // }

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
  }
  retrieveData() {
    this.dataService.getData().subscribe((res: any) => {
      this.data = res || [];
      if (this.data) {
        
        this.result = this.data.result;
        console.log(this.result.filter((r:any)=>r.responseType.name=='LONG_TEXT'));

        this.answers = this.result.map((r: any) => {
          return r.answer
        });
          this.answers.map((r: any, index: any) => {
            
            if(r.originalName!=null && this.result.filter((r:any)=>r.responseType.name=='LONG_TEXT'))
            {
              const texts=this.fb.group({
                answer:[this.answers[index].originalName]
              });
            this.text.push(texts);
            }
            else if(r.bool !=null  && this.result.filter((r:any)=>r.responseType.name=='BOOL') )
            {
              const radios=this.fb.group({
                bool:[this.answers[index].bool]
              });
              this.radio.push(radios);
            }
            else if(r.bool !=null  && this.result.filter((r:any)=>r.responseType.name=='MULTI_SELECT') )
            {
              const selects=this.fb.group({
                select:[this.answers[index].name]
              });
              this.select.push(selects);
            }
          });
        
      }
    });
    // this.questionForm.patchValue({
    //   'select':this.questionForm.value.select
    // })
        // console.log(this.result);
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
  change(event:any,index:number)
  {
   this.questionForm.value.select[index]={id:event.value};
    
  }
  radioChange(event:any,index:number)
  {
    this.questionForm.value.radio[index]={bool:event.value};
  }

  saveFormData(item:any)
  {
  
  //   this.savedData=[{
  //     questionId:'',
  //     answer:''
  //   },{
  //     questionId:'',
  //     bool:false,
  //   },
  // {
  //   questionId:'',
  //   multi:[{id:1},{id:2}]
  // }]
  this.savedData=[]
     console.log(item);
     
     this.answers.map((r:any,index:any)=>{
      const data={
        questionId:this.answers[index].questionId
      }
      console.log(data);
      this.savedData.push(data as any);
      console.log(this.savedData);
      
      
     });
 
    console.log(this.questionForm.value);
    
    
  }

}
