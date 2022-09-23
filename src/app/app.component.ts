import { Component, OnInit } from '@angular/core';
import { DailyRecord } from './entitiy/daily-record';
import { DailyRecordService } from './service/daily-record.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private dailyRecord: DailyRecordService) { }

  today: Date = new Date()

  ngOnInit(): void {

    this.dailyRecord.getAllRecords().subscribe(res => {
      const todayName = this.today.toLocaleDateString()

      if (res.days.find(record => { return record.date == todayName }) == undefined)
        this.dailyRecord.updateAllRecords(this.getAllDailyRecordInMonth(new Date().getMonth())).subscribe()

    })

  }

  getAllDailyRecordInMonth(month: number): DailyRecord[] {
    const date = new Date(2022, month, 1);

    const dailyRecords: DailyRecord[] = [];

    while (date.getMonth() == month) {
      dailyRecords.push(
        {
          id: uuid.v4().substring(0, 5),
          date: new Date(date).toLocaleDateString(),
          tasks: [],
          solvedSets: []
        }
      );
      date.setDate(date.getDate() + 1);
    }

    return dailyRecords;
  }

  title = 'english-vocabulary-learning-app';

}
