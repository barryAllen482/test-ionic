import { CrudService } from './../services/crud.service';
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from '../services/crud.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
})
export class UpdateTodoPage implements OnInit {

  editForm = this.fb.group({
    title: [],
    description: []
  });

  id: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private crudService: CrudService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTask(this.id);
  }

  updateForm(todo: ToDo) {
    this.editForm.patchValue({
      title: todo.title,
      description: todo.description
    });
  }

  async getTask(id: string) {
    console.log('-- id: --', id);
    this.crudService.getTask(id).then(data => {
      this.updateForm({...data.data() as ToDo});
    }).catch(err => {
      console.log(err);
    });
  }

  onSubmit() {
    this.crudService.update(this.id, this.editForm.value).then(res => {
      this.navCtrl.back();
    });
    this.navCtrl.back();
    this.editForm.reset();
  }

}
