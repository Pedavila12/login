import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    canActivateChild: [AuthGuard],
    children: [
      
      {
      path:'',
      loadChildren: () => import('./pages/tasks-list/tasks-list.module').then( m => m.TasksListPageModule)
    }]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
