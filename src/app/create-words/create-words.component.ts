import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Word } from '../entitiy/word';
import { StudySetService } from '../service/study-set.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-words',
  templateUrl: './create-words.component.html',
  styleUrls: ['./create-words.component.css']
})
export class CreateWordsComponent implements OnInit {

  @Output() arrayOut = new EventEmitter();
  @ViewChild('count') count: ElementRef | undefined;

  outputArray() {
    this.arrayOut.emit(this.wordArray)
  }
  countHandler() {

    if (this.count) this.wordCount = this.count.nativeElement.value;

    const sayac = this.wordCount > this.wordArray.length ? this.wordCount - this.wordArray.length : this.wordArray.length - this.wordCount

    for (let index = 0; index < sayac; index++) {

      let newWordObject: Word = {
        id: uuid.v4().substring(0, 5),
        english: "",
        turkish: {
          first: "",
          second: ""
        },
        description: "",
        sentences: [
          {
            english: "",
            description: ""
          },
          {
            english: "",
            description: ""
          },
          {
            english: "",
            description: ""
          }
        ],
        rating: 0,
        trueAnswer: 0,
        falseAnswer: 0
      };

      if (this.wordCount > this.wordArray.length) this.wordArray.push(newWordObject);

      if (this.wordCount < this.wordArray.length) this.wordArray.pop();

    }




  }

  constructor() { }

  panelOpenState: boolean = true;
  wordCount: number = 1;
  wordArray: Word[] = []
  wordNumber: number | undefined;

  words = new FormGroup({
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

  ngOnInit(): void {

    this.countHandler();

    this.words.get('english')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].english = res
    })

    this.words.get('turkhishFirst')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].turkish.first = res
    })

    this.words.get('turkishSecond')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].turkish.second = res
    })

    this.words.get('description')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].description = res
    })

    this.words.get('sentenceFirstEnglish')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[0].english = res
    })

    this.words.get('sentenceFirstDescription')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[0].description = res
    })

    this.words.get('sentenceSecondEnglish')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[1].english = res
    })

    this.words.get('sentenceSecondDescription')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[1].description = res
    })

    this.words.get('sentenceThirdEnglish')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[2].english = res
    })

    this.words.get('sentenceThirdDescription')?.valueChanges.subscribe(res => {
      if (this.wordNumber != undefined) this.wordArray[this.wordNumber].sentences[2].description = res
    })

  }


  panelOpened(i: number) {
    this.panelOpenState = true;
    this.wordNumber = i;
    this.words.setValue({
      english: this.wordArray[i].english,
      turkhishFirst: this.wordArray[i].turkish.first,
      turkishSecond: this.wordArray[i].turkish.second,
      description: this.wordArray[i].description,
      sentenceFirstEnglish: this.wordArray[i].sentences[0].english,
      sentenceFirstDescription: this.wordArray[i].sentences[0].description,
      sentenceSecondEnglish: this.wordArray[i].sentences[1].english,
      sentenceSecondDescription: this.wordArray[i].sentences[1].description,
      sentenceThirdEnglish: this.wordArray[i].sentences[2].english,
      sentenceThirdDescription: this.wordArray[i].sentences[2].description,
    });

  }

}
