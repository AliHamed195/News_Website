import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeArticleDetailsPageComponent } from './home-article-details-page.component';

describe('HomeArticleDetailsPageComponent', () => {
  let component: HomeArticleDetailsPageComponent;
  let fixture: ComponentFixture<HomeArticleDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeArticleDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeArticleDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
