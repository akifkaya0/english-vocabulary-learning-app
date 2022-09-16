import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyRecord } from '../entitiy/daily-record';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class DailyRecordService extends BaseServiceService {

  constructor(private base: BaseServiceService) {
		super(base.http);
	}


  public getDailyRecords() : Observable<DailyRecord[]>{
    return this.getReq("/dailyRecord");
  }

  public addDailyRecord(record : DailyRecord){
    return this.postReq("/dailyRecord" , record)
  }

  public updateDailyRecord(record : DailyRecord){
    return this.putReq(("/dailyRecord/" + record.id) , record)
  }

}
