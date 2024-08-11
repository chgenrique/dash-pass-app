import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    //CardComponent,
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class MainModule { }
