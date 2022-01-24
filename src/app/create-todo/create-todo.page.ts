import { StorageService } from './../services/Storage-Service.service';
import { CrudService } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {

  private _storage: Storage | null = null;

  items = [];

  todoForm = this.fb.group({
    title: [],
    description: [],
    remindMe: false,
    dateTime: null,
  });

  remindMe: boolean;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private navCtrl: NavController,
    private StorageService: StorageService
  ) {

  }

  ngOnInit(): void {

  }
  onSubmit(value: any) {
    if (!this.todoForm.valid) {
      window.confirm('Please, fill up the form');
      return false;
    } else {
      value.remindMe = this.remindMe == null ? false : this.remindMe;
      this.localStay(value);
      this.crudService.create(value)
        .then((res) => {
          console.log(res);
          this.todoForm.reset();
          this.remindMe = true;
          this.toogleButton();
        }).catch((err) => {
          console.log(err);
        });
    }
    this.todoForm.reset();
    this.navCtrl.navigateRoot('todo-list');

  }

  async localStay(file: any){
    await this.StorageService.set('task',file);
  }



  /*

    setTimeout(() => {
        console.log('Async operation has ended');
        value.target.complete();
      }, 2000);

  */


  //
  toogleButton() {
    this.remindMe = !this.remindMe;
    const objs = document.querySelectorAll('.remindItem');
    if (this.remindMe) {
      for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        obj.setAttribute('show', 'true');
      }
    }
    else {
      for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        obj.setAttribute('show', 'false');
      }
    }
  }


}
