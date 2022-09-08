import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySet } from '../entitiy/study-set';
import { Word } from '../entitiy/word';
import { StudySetService } from '../service/study-set.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-view-set',
  templateUrl: './view-set.component.html',
  styleUrls: ['./view-set.component.css']
})
export class ViewSetComponent implements OnInit {

  constructor(public dialog: MatDialog, private service: StudySetService,
    private route: ActivatedRoute,) { }

  set: StudySet | undefined;
  setTitleInput: string | undefined = "";
  setTitleEdit: boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.service.getStudySetById(params.get('setId')).subscribe(res => this.set = res));

  }

  setTitleHandle(set: StudySet | undefined) {
    if (set && this.setTitleInput) {
      set.title = this.setTitleInput;
      this.setTitleEdit = false;
      this.service.updateSet(set).subscribe()
    }
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

  openDialog(deletedType: string, wordIndex?: number): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '0ms',
      data: {
        set: this.set,
        deletedType,
        wordIndex
      },
    });
  }

}
