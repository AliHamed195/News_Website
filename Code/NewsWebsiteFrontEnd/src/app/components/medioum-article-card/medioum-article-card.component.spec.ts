import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioumArticleCardComponent } from './medioum-article-card.component';

describe('MedioumArticleCardComponent', () => {
  let component: MedioumArticleCardComponent;
  let fixture: ComponentFixture<MedioumArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedioumArticleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedioumArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
