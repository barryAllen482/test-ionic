import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClockTodoPageRoutingModule } from './clock-todo-routing.module';

import { ClockTodoPage } from './clock-todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClockTodoPageRoutingModule
  ],
  declarations: [ClockTodoPage]
})
export class ClockTodoPageModule {}
