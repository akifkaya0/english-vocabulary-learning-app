import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyRecord } from '../entitiy/daily-record';
import { MonthlyRecord } from '../entitiy/monthly-record';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class DailyRecordService extends BaseServiceService {

  constructor(private base: BaseServiceService) {
		super(base.http);
	}


  public getMonthlyRecords() : Observable<MonthlyRecord[]>{
    return this.getReq("/dailyRecord");
  }

  public addMonthlyRecord(month : MonthlyRecord){
    return this.postReq("/dailyRecord" , month);
  }

  public updateMonthlyRecord(month : MonthlyRecord){
    return this.putReq("/dailyRecord/" + month.id , month)
  }

  // public updateDailyRecord(record : DailyRecord){
  //   return this.putReq(("/dailyRecord/" + record.id) , record)
  // }

}
