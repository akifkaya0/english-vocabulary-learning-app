import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StudySetService } from 'src/app/service/study-set.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private service: StudySetService,private router: Router,public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  deleteHandle() {
    this.data.deletedType == "set" ? this.deleteSet() : this.deleteWord()
  }

  deleteSet(){
    this.service.deleteSet(this.data.set.id).subscribe(() => this.router.navigateByUrl("/studySets"))
  }

  deleteWord(){
    let newSet = this.data.set;
    newSet.words.splice(this.data.wordIndex ,1);
    this.service.updateSet(newSet).subscribe()
  }

}
