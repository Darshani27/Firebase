import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
 
  dummyForm:FormGroup={} as any;
  data: any;
  result: any;
  answers: any;
  displayedColumns: string[] = ['section','name','answer'];

  constructor(private fb:FormBuilder,private dataService:DataService) { }

  ngOnInit(): void {
    this.dummyForm=this.fb.group(
      {
      ans:this.fb.array([])
      }
    );

    this.retrieveData();
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
          console.log(this.answers[index].originalName);
          
          if(this.answers[index].originalName !== null)
          {
            const anses=this.fb.group({
              text:[this.answers[index].originalName,Validators.required],
              select:[this.answers[index].name,Validators.required],
              radio:[this.answers[index].bool,Validators.required],
              shortText:[]
            });
            this.ans.push(anses);

          }
         
          // if(this.answers[index].originalName==null)
          // {
          //   const answerss=this.fb.group({
          //     text:[],
          //     select:[],
          //     radio:[],
          //     shortText:[]
          //   });
          // }
          // else{
          //   this.ans.push(anses)
          // }
        });
      }
  });

  }
  get ans()
  {
    return this.dummyForm.controls['ans'] as FormArray;
  }

}
