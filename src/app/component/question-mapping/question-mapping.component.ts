import { Component, OnInit } from '@angular/core';
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
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.retrieveData();
  }
  retrieveData() {
    this.dataService.getData().subscribe((res:any)=>{
      this.data=res||[];
      if(this.data)
      {
        this.result=this.data.result;
      }
    });
    console.log(this.result);
    
  }

}