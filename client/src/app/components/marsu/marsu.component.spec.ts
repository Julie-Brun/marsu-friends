import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsuComponent } from './marsu.component';

describe('MarsuComponent', () => {
  let component: MarsuComponent;
  let fixture: ComponentFixture<MarsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
