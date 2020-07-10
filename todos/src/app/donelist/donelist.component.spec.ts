import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonelistComponent } from './donelist.component';

describe('DonelistComponent', () => {
  let component: DonelistComponent;
  let fixture: ComponentFixture<DonelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
