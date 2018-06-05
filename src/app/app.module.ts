import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {Home} from "./home/home.component";
import {GigsService} from "./_shared/services/gigs.service";
import {Accordion} from "./_shared/directives/accordion.directives";
import {lPad} from "./_shared/pipes/lpad.pipe";
import {ParseDate} from "./_shared/pipes/apiDate.pipe";
import {DatePipe} from "@angular/common";
import {DateDifference} from "./_shared/pipes/dateDifference.pipe";
import {MomentModule} from "angular2-moment";
import {highlightSearchKeyword} from "./_shared/pipes/highlightSearchKeyword.pipe";
import {WindowRefService} from "./_shared/services/window.service";
import {StickDirective} from "./_shared/directives/stick.directive";

@NgModule({
  declarations: [
    AppComponent,
    Accordion,
    StickDirective,
    Home,
    lPad,
    ParseDate,
    DateDifference,
    highlightSearchKeyword
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(rootRouterConfig, {useHash: false})
  ],
  providers: [GigsService, DatePipe, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
