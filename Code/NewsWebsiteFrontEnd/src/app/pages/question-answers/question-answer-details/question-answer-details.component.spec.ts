import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerDetailsComponent } from './question-answer-details.component';

describe('QuestionAnswerDetailsComponent', () => {
  let component: QuestionAnswerDetailsComponent;
  let fixture: ComponentFixture<QuestionAnswerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnswerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionAnswerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
