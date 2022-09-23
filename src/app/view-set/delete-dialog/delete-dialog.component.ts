import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudySet } from 'src/app/entitiy/study-set';
import { DailyRecordService } from 'src/app/service/daily-record.service';
import { StudySetService } from 'src/app/service/study-set.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private dailyService : DailyRecordService ,private setService: StudySetService,private router: Router,public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    set: StudySet,
    deletedType : string,
    wordIndex : number
  }) {}

  ngOnInit(): void {
  }

  deleteHandle() {
    this.data.deletedType == "set" ? this.deleteSet() : this.deleteWord()
  }

  deleteSet(){

    this.dailyService.getAllRecords().subscribe(res => {

      res.days.forEach(item => {
        item.tasks = item.tasks.filter(taskItem => taskItem.title !== this.data.set.title)
      })

      console.log(res.days)

      this.dailyService.updateAllRecords(res.days).subscribe()

    })


    this.setService.deleteSet(this.data.set.id).subscribe(() => this.router.navigateByUrl("/studySets"))
  }

  deleteWord(){
    let newSet = this.data.set;
    newSet.words.splice(this.data.wordIndex ,1);
    this.setService.updateSet(newSet).subscribe()
  }

}
