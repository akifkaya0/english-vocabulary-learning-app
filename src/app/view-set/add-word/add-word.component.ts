import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudySet } from 'src/app/entitiy/study-set';
import { Word } from 'src/app/entitiy/word';
import { StudySetService } from 'src/app/service/study-set.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {



  constructor(private service: StudySetService, private route: ActivatedRoute, private router: Router) { }

  id: string | null = "";
  text: string = "";
  set: StudySet | undefined;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => this.id = params.get('setId'));

    this.service.getStudySetById(this.id).subscribe(res => {
      this.set = res;
    })

  }

  parseWords() {

    let words: string[] = [];

    words = this.text.split("\n");

    const newWords: Word[] = words.map((item) => {

      return {
        id: uuid.v4().substring(0, 5),
        english: item.split('-')[0].trim().toLowerCase(),
        turkish: {
          first: item.split('-')[1].trim().split(',')[0].trim().toLowerCase(),
          second: item.split('-')[1].trim().split(',')[1].trim().toLowerCase()
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

    });


    if(this.set){

      this.set.words = this.set.words.concat(newWords)

      this.service.updateSet(this.set).subscribe(() => this.router.navigateByUrl("/set/" + this.id))
    }


  }

}
