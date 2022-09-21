import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Word } from '../entitiy/word';
import { DailyRecordService } from '../service/daily-record.service';
import { DailyRecord } from '../entitiy/daily-record';
import { MonthlyRecord } from '../entitiy/monthly-record';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor(private service: StudySetService, private taskService: DailyRecordService, private router: Router) { }

  ngOnInit(): void {
  }

  setTitle: string = "";
  now: Date = new Date();
  monthlyRecord: MonthlyRecord | undefined;

  createSet(wordArray: Word[]) {

    this.service.addSet({
      "id": uuid.v4().substring(0, 5),
      "title": this.setTitle,
      "testValue": 0,
      "words": wordArray
    }).subscribe(res => {

      this.taskService.getMonthlyRecords().subscribe(res => {

        this.monthlyRecord = res.find(el => el.name == (this.now.getMonth()+1) + "-" + this.now.getFullYear())

        for (let counter = 0; counter < 7; counter++)  {

          if (counter == 0 || counter == 1 || counter == 3 || counter == 6) {

            this.monthlyRecord?.days[this.now.getDate() +counter-1].tasks.push({
              id: uuid.v4().substring(0, 5),
              title: this.setTitle,
              isDone: false
            })

          }

        };

        if(this.monthlyRecord) this.taskService.updateMonthlyRecord(this.monthlyRecord).subscribe()

      });

      this.router.navigateByUrl("/set/" + res.id)
    });

  }



}
