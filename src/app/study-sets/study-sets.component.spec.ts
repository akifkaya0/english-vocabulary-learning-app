import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySetsComponent } from './study-sets.component';

describe('StudySetsComponent', () => {
  let component: StudySetsComponent;
  let fixture: ComponentFixture<StudySetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudySetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudySetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
