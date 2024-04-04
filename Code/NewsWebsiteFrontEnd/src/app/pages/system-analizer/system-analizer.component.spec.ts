import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAnalizerComponent } from './system-analizer.component';

describe('SystemAnalizerComponent', () => {
  let component: SystemAnalizerComponent;
  let fixture: ComponentFixture<SystemAnalizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemAnalizerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemAnalizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
