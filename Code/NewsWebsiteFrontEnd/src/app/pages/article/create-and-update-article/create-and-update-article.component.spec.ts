import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndUpdateArticleComponent } from './create-and-update-article.component';

describe('CreateAndUpdateArticleComponent', () => {
  let component: CreateAndUpdateArticleComponent;
  let fixture: ComponentFixture<CreateAndUpdateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAndUpdateArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAndUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
