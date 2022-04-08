import { SharedModule } from './../../shared/shared.module';
import { TasksItemComponent } from './tasks-item/tasks-item.component';
import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TasksItemComponent
  ],
  imports: [SharedModule],
  exports: [
    TasksItemComponent
  ]
})
export class ComponentsModule { }
