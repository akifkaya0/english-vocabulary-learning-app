import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudySet } from '../entitiy/study-set';
import { Word } from '../entitiy/word';
import { QuestionType } from '../enums/question-type.enum';
import { StudySetService } from '../service/study-set.service';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: StudySetService) { }

  set: StudySet | undefined

  questionNumber : number = 1;
  questionWord : string = "";
  questionType : string = "gap-filling";

  answerWords : string[] = ["A","B","C","D"];
  gapFillingText : string = "";

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => this.service.getStudySetById(params.get('setId')).subscribe(res => {
      this.set = res
    }));


  }

  verfiyAnswer(answer? : string){

  }

}
