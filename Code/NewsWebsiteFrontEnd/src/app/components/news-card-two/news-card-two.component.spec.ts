import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardTwoComponent } from './news-card-two.component';

describe('NewsCardTwoComponent', () => {
  let component: NewsCardTwoComponent;
  let fixture: ComponentFixture<NewsCardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
