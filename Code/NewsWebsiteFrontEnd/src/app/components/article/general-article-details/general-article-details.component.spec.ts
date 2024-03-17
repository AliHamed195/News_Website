import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralArticleDetailsComponent } from './general-article-details.component';

describe('GeneralArticleDetailsComponent', () => {
  let component: GeneralArticleDetailsComponent;
  let fixture: ComponentFixture<GeneralArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralArticleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
