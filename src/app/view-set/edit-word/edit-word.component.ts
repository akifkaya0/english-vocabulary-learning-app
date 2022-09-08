import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudySet } from 'src/app/entitiy/study-set';
import { Word } from 'src/app/entitiy/word';
import { StudySetService } from 'src/app/service/study-set.service';


@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  word = new FormGroup({
    english: new FormControl(""),
    turkhishFirst: new FormControl(""),
    turkishSecond: new FormControl(""),
    description: new FormControl(""),
    sentenceFirstEnglish: new FormControl(""),
    sentenceFirstDescription: new FormControl(""),
    sentenceSecondEnglish: new FormControl(""),
    sentenceSecondDescription: new FormControl(""),
    sentenceThirdEnglish: new FormControl(""),
    sentenceThirdDescription: new FormControl(""),
  })

  set: StudySet | undefined;

  wordHistory: Word[] = [];

  constructor(private route: ActivatedRoute, private service: StudySetService,) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.service.getStudySetById(params.get('setId')).subscribe(res => {

      this.set = res;
      this.wordHistory.push(res.words.filter((word: { id: string | null; }) => word.id === params.get('wordId'))[0])
      this.changeFormValue();

    }));



  }


  changeFormValue() {

    console.log(this.wordHistory)

    let lastIndex: number = this.wordHistory.length - 1;

    if (lastIndex != undefined)
      this.word.setValue({
        english: this.wordHistory[lastIndex].english,
        turkhishFirst: this.wordHistory[lastIndex].turkish.first,
        turkishSecond: this.wordHistory[lastIndex].turkish.second,
        description: this.wordHistory[lastIndex].description,
        sentenceFirstEnglish: this.wordHistory[lastIndex].sentences[0].english,
        sentenceFirstDescription: this.wordHistory[lastIndex].sentences[0].description,
        sentenceSecondEnglish: this.wordHistory[lastIndex].sentences[1].english,
        sentenceSecondDescription: this.wordHistory[lastIndex].sentences[1].description,
        sentenceThirdEnglish: this.wordHistory[lastIndex].sentences[2].english,
        sentenceThirdDescription: this.wordHistory[lastIndex].sentences[2].description,
      });

  }




}
