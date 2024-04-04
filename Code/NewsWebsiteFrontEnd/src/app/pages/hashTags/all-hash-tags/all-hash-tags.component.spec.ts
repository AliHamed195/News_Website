import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHashTagsComponent } from './all-hash-tags.component';

describe('AllHashTagsComponent', () => {
  let component: AllHashTagsComponent;
  let fixture: ComponentFixture<AllHashTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllHashTagsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllHashTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
