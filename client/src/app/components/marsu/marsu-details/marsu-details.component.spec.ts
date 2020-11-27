import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsuDetailsComponent } from './marsu-details.component';

describe('MarsuDetailsComponent', () => {
  let component: MarsuDetailsComponent;
  let fixture: ComponentFixture<MarsuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarsuDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarsuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
