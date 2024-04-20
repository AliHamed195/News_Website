import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHomeNavComponent } from './sub-home-nav.component';

describe('SubHomeNavComponent', () => {
  let component: SubHomeNavComponent;
  let fixture: ComponentFixture<SubHomeNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubHomeNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubHomeNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
