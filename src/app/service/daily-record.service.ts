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

  public getAllRecords() : Observable<{id: string, days : DailyRecord[]}>{
    return this.getReq("/dailyRecords");
  }

  public updateAllRecords(month : DailyRecord[]){
    return this.putReq("/dailyRecords", {id : "111" , days :month})
  }

}
