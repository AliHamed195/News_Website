import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndUpdateQuestionAnswerComponent } from './create-and-update-question-answer.component';

describe('CreateAndUpdateQuestionAnswerComponent', () => {
  let component: CreateAndUpdateQuestionAnswerComponent;
  let fixture: ComponentFixture<CreateAndUpdateQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndUpdateQuestionAnswerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAndUpdateQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
