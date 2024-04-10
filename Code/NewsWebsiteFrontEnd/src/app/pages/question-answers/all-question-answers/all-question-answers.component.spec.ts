import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuestionAnswersComponent } from './all-question-answers.component';

describe('AllQuestionAnswersComponent', () => {
  let component: AllQuestionAnswersComponent;
  let fixture: ComponentFixture<AllQuestionAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllQuestionAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllQuestionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
