import { TestBed } from '@angular/core/testing';

import { DailyRecordService } from './daily-record.service';

describe('DailyRecordService', () => {
  let service: DailyRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
