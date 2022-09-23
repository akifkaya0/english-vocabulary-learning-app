import { Injectable } from '@angular/core';
import { StudySet } from '../entitiy/study-set';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudySetService extends BaseServiceService {

  constructor(private base: BaseServiceService) {
		super(base.http);
	}

  public getStudySets() {
    return this.getReq("/studySets");
  }

  public getStudySetById(id: string | null ) {
    return this.getReq(("/studySets/" + id));
  }

  public updateSet(updatedSet : StudySet){
    return this.putReq("/studySets/" + updatedSet.id , updatedSet);
  }

  public addSet(newSet : StudySet){
    return this.postReq("/studySets" , newSet);
  }

  public deleteSet(id: string | undefined){
    return this.deleteReq("/studySets/" + id);
  }


}
