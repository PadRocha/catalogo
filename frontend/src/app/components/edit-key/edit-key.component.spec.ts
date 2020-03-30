import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKeyComponent } from './edit-key.component';

describe('EditKeyComponent', () => {
  let component: EditKeyComponent;
  let fixture: ComponentFixture<EditKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
