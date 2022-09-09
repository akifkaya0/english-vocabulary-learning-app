import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';
import { Word } from '../entitiy/word';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css']
})
export class CreateSetComponent implements OnInit {

  constructor(private service : StudySetService, private router: Router) { }

  ngOnInit(): void {
  }

  setTitle : string = "";

  createSet(wordArray : Word[]){

    this.service.addSet({
      "id" : uuid.v4().substring(0,5),
      "title" : this.setTitle,
      "testValue" : 0,
      "words" : wordArray
    }).subscribe(res => this.router.navigateByUrl("/set/" + res.id));

  }



}
