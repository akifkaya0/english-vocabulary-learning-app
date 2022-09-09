import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySet } from 'src/app/entitiy/study-set';
import { Word } from 'src/app/entitiy/word';
import { WordForm } from 'src/app/entitiy/word-form';
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
  wordObj: Word | undefined;
  wordHistory: Word[] = [];
  wordHistoryIndex: number = 0;
  wordHistoryCount: number = 0;


  constructor(private route: ActivatedRoute, private service: StudySetService,private router : Router) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => this.service.getStudySetById(params.get('setId')).subscribe(res => {

      this.set = res;
      this.wordObj = res.words.filter((word: { id: string | null; }) => word.id === params.get('wordId'))[0];

      if (this.wordObj)
        this.wordHistory.push(this.wordObj)

      this.changeFormValue();

    }));

    this.word.valueChanges.subscribe(res => {

      if (++this.wordHistoryCount > 4) {

        this.wordHistory.splice(this.wordHistoryIndex + 1, this.wordHistory.length - this.wordHistoryIndex)

        this.wordHistory.push(this.getWordObj(

          Object.assign({
            english: "", turkhishFirst: "", turkishSecond: "", description: "", sentenceFirstEnglish: "",
            sentenceFirstDescription: "", sentenceSecondEnglish: "", sentenceSecondDescription: "",
            sentenceThirdEnglish: "", sentenceThirdDescription: ""
          }, res)

        ))
        this.wordHistoryCount = 0;
        this.wordHistoryIndex++;
        this.changeFormValue()

      }

    })

  }

  getWordFormObj(obj: Word): WordForm {

    const { english, turkish: { first, second }, description } = obj

    return {
      english,
      turkhishFirst: first,
      turkishSecond: second,
      description,
      sentenceFirstEnglish: obj.sentences[0].english,
      sentenceFirstDescription: obj.sentences[0].description,
      sentenceSecondEnglish: obj.sentences[1].english,
      sentenceSecondDescription: obj.sentences[1].description,
      sentenceThirdEnglish: obj.sentences[2].english,
      sentenceThirdDescription: obj.sentences[2].description,
    }

  }

  getWordObj(obj: WordForm): Word {

    const { english, turkhishFirst, turkishSecond, description, sentenceFirstEnglish,
      sentenceFirstDescription, sentenceSecondEnglish, sentenceSecondDescription,
      sentenceThirdEnglish, sentenceThirdDescription } = obj

    if (this.wordObj) return {
      ...this.wordObj,
      english,
      turkish: {
        first: turkhishFirst,
        second: turkishSecond
      },
      description,
      sentences: [
        { english: sentenceFirstEnglish, description: sentenceFirstDescription },
        { english: sentenceSecondEnglish, description: sentenceSecondDescription },
        { english: sentenceThirdEnglish, description: sentenceThirdDescription }
      ]
    }

    return {} as Word

  }

  undoRedoHandler(value: number) {

    this.wordHistoryIndex = this.wordHistoryIndex + value;
    this.changeFormValue();
    this.wordHistoryCount--;

  }

  changeFormValue() {

    this.word.setValue(this.getWordFormObj(this.wordHistory[this.wordHistoryIndex]));

  }

  submitWord() {

    if (this.set && this.wordObj) {
      this.set.words[this.set.words.indexOf(this.wordObj)] = this.getWordObj(this.word.getRawValue())
      this.service.updateSet(this.set).subscribe((res)=>this.router.navigateByUrl('/set/' + res.id))
    }
  }

}
