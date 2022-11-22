import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMappingComponent } from './question-mapping.component';

describe('QuestionMappingComponent', () => {
  let component: QuestionMappingComponent;
  let fixture: ComponentFixture<QuestionMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
