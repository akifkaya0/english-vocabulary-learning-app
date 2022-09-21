import { Component, OnInit } from '@angular/core';
import { DailyRecord } from './entitiy/daily-record';
import { DailyRecordService } from './service/daily-record.service';
import * as uuid from 'uuid';
import { MonthlyRecord } from './entitiy/monthly-record';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dailyRecord : DailyRecordService){}

  today : Date = new Date()

  ngOnInit(): void {

    this.dailyRecord.getMonthlyRecords().subscribe(res=> {
      const todayName = (this.today.getMonth()+1) + "-" + this.today.getFullYear()
      var a = res.find(record => {
        return record.name == todayName
      })
      if(a == undefined) this.dailyRecord.addMonthlyRecord(this.getAllDailyRecordInMonth(new Date().getMonth())).subscribe()

    })

  }

  getAllDailyRecordInMonth( month: number) : MonthlyRecord {
    const date = new Date(2022, month, 1);

    const dailyRecords : DailyRecord[] = [];

    while (date.getMonth() == month) {
      dailyRecords.push(
        {
          id : uuid.v4().substring(0, 5),
          date: new Date(date).toLocaleDateString(),
          tasks: [],
          solvedSets: []
        }
      );
      date.setDate(date.getDate() + 1);
    }

    return {
      id: uuid.v4().substring(0, 5),
      name : date.getMonth() + "-" + date.getFullYear(),
      days: dailyRecords
    };
  }

  title = 'english-vocabulary-learning-app';

}
