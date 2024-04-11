import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlDetailsComponent } from './article-details.component';

describe('ArticlDetailsComponent', () => {
  let component: ArticlDetailsComponent;
  let fixture: ComponentFixture<ArticlDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
