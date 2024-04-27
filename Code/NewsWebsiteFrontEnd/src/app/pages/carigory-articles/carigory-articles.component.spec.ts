import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarigoryArticlesComponent } from './carigory-articles.component';

describe('CarigoryArticlesComponent', () => {
  let component: CarigoryArticlesComponent;
  let fixture: ComponentFixture<CarigoryArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarigoryArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarigoryArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
