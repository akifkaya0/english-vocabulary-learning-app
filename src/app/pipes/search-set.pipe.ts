import { Pipe, PipeTransform } from '@angular/core';
import { StudySet } from '../entitiy/study-set';

@Pipe({
  name: 'searchSet'
})
export class SearchSetPipe implements PipeTransform {

  transform(value: StudySet[], search: string):StudySet[] {
	console.log(search.toLowerCase())
    return value.filter(el => el.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
