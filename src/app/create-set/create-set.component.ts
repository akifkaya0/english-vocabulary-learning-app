import { Component, OnInit } from '@angular/core';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

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

  createSet(){

    this.service.addSet({
      "id" : uuid.v4().substring(0,5),
      "title" : this.setTitle,
      "testValue" : 0,
      "words" : []
    }).subscribe(res => this.router.navigateByUrl("/set/" + res.id));

  }

}
