import { Component, OnInit } from '@angular/core';
import { DailyRecord } from '../entitiy/daily-record';
import { StudySet } from '../entitiy/study-set';
import { Word } from '../entitiy/word';
import { DailyRecordService } from '../service/daily-record.service';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-study-sets',
  templateUrl: './study-sets.component.html',
  styleUrls: ['./study-sets.component.css']
})
export class StudySetsComponent implements OnInit {

  constructor(private setService: StudySetService, private taskService: DailyRecordService) { }

  sets: StudySet[] = [];
  dailyRecord: DailyRecord | undefined;

  ngOnInit(): void {



    this.setService.getStudySets().subscribe(res => this.sets = res)
    this.taskService.getDailyRecords().subscribe(res => {

      const record = res.find(element => element.date == new Date().toLocaleDateString())
      if (record)
        this.dailyRecord = record
      else {
        this.dailyRecord = {
          id : uuid.v4().substring(0, 5),
          date: new Date().toLocaleDateString(),
          tasks: [],
          solvedSets: []
        }
        this.taskService.addDailyRecord(this.dailyRecord).subscribe()

      }

    }



    )

  }

  calculate(array: Word[] | undefined) {
    var sum = 0;

    if (array?.length) {
      for (var i = 0; i < array.length; i++) {
        sum = sum + array[i].rating;
      }
      return (sum / array.length).toPrecision(4);
    }
    return "--";
  }

}
