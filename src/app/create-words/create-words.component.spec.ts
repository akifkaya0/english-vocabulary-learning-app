import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordsComponent } from './create-words.component';

describe('CreateWordsComponent', () => {
  let component: CreateWordsComponent;
  let fixture: ComponentFixture<CreateWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
