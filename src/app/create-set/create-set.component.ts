import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Word } from '../entitiy/word';
import { DailyRecordService } from '../service/daily-record.service';

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

  createSet(wordArray: Word[]) {

    this.service.addSet({
      "id": uuid.v4().substring(0, 5),
      "title": this.setTitle,
      "testValue": 0,
      "words": wordArray
    }).subscribe(res => {

      this.taskService.getAllRecords().subscribe(res => {

        for (let counter = 0; counter < 7; counter++)  {

          if (counter == 0 || counter == 1 || counter == 3 || counter == 6) {

            this.now.setDate(this.now.getDate() + counter);
            console.log(res.days)
            res.days.find(el => el.date == this.now.toLocaleDateString())?.tasks.push({
              id: uuid.v4().substring(0, 5),
              title: this.setTitle,
              isDone: false
            })

            console.log(res.days)

          }

        };

        this.taskService.updateAllRecords(res.days).subscribe()

      });

      this.router.navigateByUrl("/set/" + res.id)
    });

  }



}
