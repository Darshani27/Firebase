import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationInputComponent } from './conversation-input.component';

describe('ConversationInputComponent', () => {
  let component: ConversationInputComponent;
  let fixture: ComponentFixture<ConversationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
