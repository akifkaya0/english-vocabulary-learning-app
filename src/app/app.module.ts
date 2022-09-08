import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudySetsComponent } from './study-sets/study-sets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {HttpClientModule} from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CreateSetComponent } from './create-set/create-set.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSetComponent } from './view-set/view-set.component';
import {MatIconModule} from '@angular/material/icon';
import { CreateWordsComponent } from './create-words/create-words.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from './view-set/delete-dialog/delete-dialog.component';
import { ViewWordComponent } from './view-word/view-word.component';


@NgModule({
  declarations: [
    AppComponent,
    StudySetsComponent,
    ToolbarComponent,
    CreateSetComponent,
    ViewSetComponent,
    CreateWordsComponent,
    DeleteDialogComponent,
    ViewWordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteDialogComponent
  ],
})
export class AppModule { }
