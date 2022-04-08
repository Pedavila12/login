import { Routes } from '@angular/router';
import { ComponentsModule } from './../../components/components.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasksListPageRoutingModule } from './tasks-list-routing.module';

import { TasksListPage } from './tasks-list.page';


const routes: Routes = [
  {
    path: '',
    component: TasksListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TasksListPageRoutingModule,
    SharedModule,
    ComponentsModule,
    

  ],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
