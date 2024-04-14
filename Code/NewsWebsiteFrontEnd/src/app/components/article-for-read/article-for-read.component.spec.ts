import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleForReadComponent } from './article-for-read.component';

describe('ArticleForReadComponent', () => {
  let component: ArticleForReadComponent;
  let fixture: ComponentFixture<ArticleForReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleForReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleForReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
