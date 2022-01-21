import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create-task',
    pathMatch: 'full'
  },
  {
    path: 'create-task',
    loadChildren: () => import('./create-todo/create-todo.module').then( m => m.CreateTodoPageModule)
  },
  {
    path: 'update-todo/:id',
    loadChildren: () => import('./update-todo/update-todo.module').then( m => m.UpdateTodoPageModule)
  },
  {
    path: 'todo-list',
    loadChildren: () => import('./todo-list/todo-list.module').then( m => m.TodoListPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./outils/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'done',
    loadChildren: () => import('./outils/done/done.module').then( m => m.DonePageModule)
  },
  {
    path: 'follow',
    loadChildren: () => import('./outils/follow/follow.module').then( m => m.FollowPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./outils/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'clock-todo',
    loadChildren: () => import('./clock-todo/clock-todo.module').then( m => m.ClockTodoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
