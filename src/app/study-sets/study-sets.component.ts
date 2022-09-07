import { Component, OnInit } from '@angular/core';
import { StudySet } from '../entitiy/study-set';
import { Word } from '../entitiy/word';
import { StudySetService } from '../service/study-set.service';

@Component({
  selector: 'app-study-sets',
  templateUrl: './study-sets.component.html',
  styleUrls: ['./study-sets.component.css']
})
export class StudySetsComponent implements OnInit {

  constructor(private service: StudySetService) { }

  sets:StudySet[] = [];

  ngOnInit(): void {
    this.service.getStudySets().subscribe(res => this.sets = res)
  }

  calculate(array:Word[] | undefined) {
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
