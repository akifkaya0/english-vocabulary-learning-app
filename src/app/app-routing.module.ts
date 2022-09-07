import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetComponent } from './create-set/create-set.component';
import { StudySetsComponent } from './study-sets/study-sets.component';
import { ViewSetComponent } from './view-set/view-set.component';

const routes: Routes = [
  {path : "" , pathMatch : "full" , redirectTo : "studySets"},
  {path : "studySets" , component : StudySetsComponent},
  {path : "createSet" , component : CreateSetComponent},
  {path : "set/:setId" , component : ViewSetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
