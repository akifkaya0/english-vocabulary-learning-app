import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetComponent } from './create-set/create-set.component';
import { LearnComponent } from './learn/learn.component';
import { StudySetsComponent } from './study-sets/study-sets.component';
import { AddWordComponent } from './view-set/add-word/add-word.component';
import { EditWordComponent } from './view-set/edit-word/edit-word.component';
import { ViewSetComponent } from './view-set/view-set.component';

const routes: Routes = [
  {path : "" , pathMatch : "full" , redirectTo : "studySets"},
  {path : "studySets" , component : StudySetsComponent},
  {path : "createSet" , component : CreateSetComponent},
  {path : "set/:setId" , component : ViewSetComponent},
  {path : ":setId/word/:wordId" , component : EditWordComponent},
  {path : ":setId/addWord" , component : AddWordComponent},
  {path : "learn/:setId" , component : LearnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
