import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Word } from '../entitiy/word';
import { DailyRecordService } from '../service/daily-record.service';
import { DailyRecord } from '../entitiy/daily-record';

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

  createSet(wordArray: Word[]) {

    this.service.addSet({
      "id": uuid.v4().substring(0, 5),
      "title": this.setTitle,
      "testValue": 0,
      "words": wordArray
    }).subscribe(res => {
      this.taskService.getDailyRecords().subscribe(res => {
        debugger
        let dailyRecord: DailyRecord | undefined
        for (let index = 1; index <= 7; index++) {

          if (index == 1 || index == 2 || index == 4 || index == 5 || index == 7) {
            var date = new Date()
            date.setDate(date.getDate() + index - 1)

            var aa  : string= date.toLocaleDateString()
            dailyRecord = res.find(record => {
              return record.date === aa
            })

            if (dailyRecord == undefined){
              dailyRecord = {
                id: uuid.v4().substring(0, 5),
                date: date.toLocaleDateString(),
                tasks: [{
                  id: uuid.v4().substring(0, 5),
                  title: this.setTitle,
                  isDone: true
                }],
                solvedSets: []
              }
              this.taskService.addDailyRecord(dailyRecord).subscribe()
              continue
            }

            dailyRecord.tasks.push({
              id: uuid.v4().substring(0, 5),
              title: this.setTitle,
              isDone: true
            })

            this.taskService.updateDailyRecord(dailyRecord).subscribe()

          }



        }

      })

      this.router.navigateByUrl("/set/" + res.id)
    });

  }



}
