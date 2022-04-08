import { OverlayService } from './../../../core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { TasksService } from './../../service/tasks.service';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { promise } from 'protractor';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage {

  tasks$: Observable<Task[]>;

  constructor(private navCtrl: NavController,private overlayService: OverlayService, private tasksService: TasksService) { }

  async ionViewDidEnter():Promise<void> {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task):void{
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`)
  }

  async onDelete(task: Task): Promise<void>{
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons:[
        {
          text: 'Yes',
          handler: async ()=>{
            await this.tasksService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            })
          }
        },
        'No'
      ]
    })
  }

  async onDone(task: Task): Promise<void>{
    const taskToUpdate ={...task, done: !task.done};
    await this.tasksService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}" ${taskToUpdate.done ? 'completed' : 'update'}!`
    });
  }
}

