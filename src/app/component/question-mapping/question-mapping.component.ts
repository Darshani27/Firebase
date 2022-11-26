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
      'select':new FormControl(),
      'radio':new FormControl(),
      'shortText':new FormControl()
    });
    const a=this.questionForm.get('text') as FormArray;
    console.log(this.questionForm.get('text') as FormArray );
     console.log(a.statusChanges.subscribe(x=>x));
   
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
          const texts=this.fb.group({
            longtext:[this.answers[index].originalName]
          });
         this.text.push(texts);
        });
    
        
      }
    });
    // console.log(this.result);
  }
  get text()
  {
    return this.questionForm.controls['text'] as FormArray;
  }

  saveFormData(item:any)
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
     console.log(item);
     
    
 
    // this.questionForm.value
    // console.log(questionForm.value);
    console.log(this.textRef.nativeElement.value);
    
    
  }

}
