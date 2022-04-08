import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', //loadChildren: './auth/auth.module#AuthModule'
    loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule)
    
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/pages/tasks-list/tasks-list.module').then( m => m.TasksListPageModule), canLoad:[AuthGuard]
  },
  {
    path: 'tasks/create',
    loadChildren: () => import('./tasks/pages/task-save/task-save.module').then( m => m.TaskSavePageModule), canLoad:[AuthGuard]
  },
  {
    path: 'tasks/edit/:id',
    loadChildren: () => import('./tasks/pages/task-save/task-save.module').then( m => m.TaskSavePageModule), canLoad:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
