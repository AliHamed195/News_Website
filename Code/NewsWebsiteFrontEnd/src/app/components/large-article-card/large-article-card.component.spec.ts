import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeArticleCardComponent } from './large-article-card.component';

describe('LargeArticleCardComponent', () => {
  let component: LargeArticleCardComponent;
  let fixture: ComponentFixture<LargeArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LargeArticleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LargeArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
