import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFriendComponent } from './create-friend.component';

describe('CreateFriendComponent', () => {
  let component: CreateFriendComponent;
  let fixture: ComponentFixture<CreateFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
