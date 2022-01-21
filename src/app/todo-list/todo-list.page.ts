import { StorageService } from './../services/Storage-Service.service';
import { element } from 'protractor';
import { CrudService, ToDo } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

import { ItemReorderEventDetail } from '@ionic/core';
import { CompileTemplateMetadata } from '@angular/compiler';
import { Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  items = [];
  listData = [];

  tasks: ToDo[];
  currentDate: string;
  date = new Date();
  myTask = '';
  curTask = null;
  reorder = false;
  reorderGroup = false;
  reorderObj = null;
  offset = null;
  reorderState = false;
  mousePos = {
    x: 0,
    y: 0
  };
  reorderObjPos = {
    x: 0,
    y: 0
  };

  constructor(
    private crudService: CrudService,
    private StorageService: StorageService,) {
    const date = new Date();
    this.currentDate = date.toLocaleDateString("fr-FR", {
      weekday: "long",
      month: "long",
      day: "numeric"
    })
  }

  async ngOnInit() {
    let objs = document.querySelectorAll(".taskItemOrder");
    objs.forEach(function (obj) {
      var item = this.reorderObj;
      /*obj=<HTMLElement>obj;
      obj.onclick=function(){
        item=this;
      };*/
      const value = this.StorageService.get("task");
      this.get("task");
    });
  }

async getTask(key: string){
  const value= await this.StorageService.get(key);
  console.log("task", value);
}

  ionViewDidEnter() {

    this.getTasks();
  }
  async getTasks() {
    const result = await this.crudService.getTasks();
    if (!result.empty) {
      this.tasks = result.docs.map(task => ({
        id: task.id,
        ...task.data() as ToDo
      }));
    } else {
      this.tasks = [];
      console.log('Empty list');
    }
  }

  remove(id: string) {
    console.log(id);
    if (window.confirm('Are you sure?')) {
      this.crudService.delete(id).then(() => this.getTasks());
    }
    return this.getTasks();
  }



  changeCheckState(task){
    
  }
  
  /*changeCheckState(task) { 
    let ids = -1;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i] == task) {
        ids = i;
        break;
      }
    }
    if (!task.checked) {
      document.querySelectorAll<HTMLElement>("ion-item ion-label strong")[ids].style.textDecoration = "line-through";
    }
    else {
      document.querySelectorAll<HTMLElement>("ion-item ion-label strong")[ids].style.textDecoration = "none";
    }
    task.checked = !task.checked;
  }
  */
  

  getDate(dateTime) {
    const timestamp = Date.parse(dateTime);
    const dateObj = new Date(timestamp);
    const date = {
      month: dateObj.getMonth() + 1, //months from 1-12
      day: dateObj.getDay(),
      year: dateObj.getFullYear()
    }
    const todayObj = new Date(Date.now());
    const today = {
      month: todayObj.getMonth() + 1, //months from 1-12
      day: todayObj.getDay(),
      year: todayObj.getFullYear()
    }

    const yeardiff = today.year - date.year;
    const monthdiff = today.month - date.month;
    const daydiff = today.day - date.day;

    var months = Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");

    const showDate = function () {
      return date.day + " " + months[date.month] + " " + date.year;
    };

    if (yeardiff == 0) {
      if (monthdiff == 0) {
        if (daydiff == 0) {
          return "Aujourd'hui";
        }
        else {
          const weeks = Math.floor(daydiff / 7);
          if (weeks == 0) {
            if (daydiff == 1) {
              return "Hier";
            }
            else if (daydiff == 2) {
              return "Avant-hier";
            }
            else {
              return showDate();
            }
          }
          else {
            return showDate();
          }
        }
      }
      else {
        return showDate();
      }
    }
    else {
      return showDate();
    }

  }

  getTime(dateTime) {
    const timestamp = Date.parse(dateTime);
    var date = new Date(timestamp);
    var hour = date.getUTCHours();
    var min = date.getUTCMinutes();
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
  }

  popupToggle() {

    let show = document.getElementById("pop").getAttribute("show");
    //
    if (show == "false") {
      document.getElementById("pop").setAttribute("show", "true");
      document.getElementById("popback").style.display = "block";
    }
    else {
      document.getElementById("popback").style.display = "none";
      document.getElementById("pop").setAttribute("show", "false");
    }
  }

  dateTimePop(task) {
    this.curTask = task;
    //
    if (task != null) {
      let obj = <HTMLInputElement>document.getElementById("dateTimeInput");
      obj.value = task.dateTime;
    }
    //
    let show = document.getElementById("dateTimeBox").getAttribute("show");
    //
    if (show == "false") {
      document.getElementById("dateTimeBox").setAttribute("show", "true");
      document.getElementById("dateTimeBack").style.display = "block";
    }
    else {
      document.getElementById("dateTimeBack").style.display = "none";
      document.getElementById("dateTimeBox").setAttribute("show", "false");
    }
  }

  filteredTasks() {
    //select the searchbar input to get the query
    const searchbar = document.querySelector('ion-searchbar');
    //
    const items = document.querySelectorAll("ion-item");
    //
    const query = searchbar.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach(item => {
        const show = item.textContent.toLowerCase().indexOf(query.toLowerCase()) > -1;
        let Hitem = <HTMLElement>item;
        Hitem.style.display = show ? 'block' : 'none';
      });
    });
  }

  toggleSearchBar() {
    let sbs = document.getElementById("searchBarShow");
    let sbb = document.getElementById("searchBarBack");
    let sb = document.getElementById("searchBar");
    let t = document.getElementById("titre");
    let show = sb.getAttribute("show") == "true" ? true : false;
    if (show) {
      sb.setAttribute("show", "false");
      sbb.setAttribute("show", "false");
      sbs.setAttribute("show", "true");
      t.setAttribute("show", "true");
    }
    else {
      sb.setAttribute("show", "true");
      sbb.setAttribute("show", "true");
      sbs.setAttribute("show", "false");
      t.setAttribute("show", "false");
    }
  }

  setTaskDateTime() {
    let obj = <HTMLInputElement>document.getElementById("dateTimeInput");
    this.curTask.dateTime = obj.value;
    //
    let taskToDo = <ToDo>this.curTask;
    //
    this.crudService.update(this.curTask.id, taskToDo);
  }
  //



doReoder(ev){
  console.log(ev);
  let taskToMove = this.tasks.splice(ev.detail.from, 1)[0];
  this.tasks.splice(ev.detail.to, 0, taskToMove);
}

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', (ev.detail.from, 1)[0] , ev.detail.to, 0);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();

    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.tasks);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.tasks = ev.detail.complete(this.tasks);

    // After complete is called the items will be in the new order
    console.log('After complete', this.tasks);
  }
  //
  toggleReorderGroup() {
    this.reorderGroup = !this.reorderGroup;
  }





  /* toggleReorder() {
     this.reorderGroup = !this.reorderGroup;
     const reorderGroup = document.getElementById('reorder');
     reorderGroup.addEventListener('ionItemReorder', ({ detail }) => {
       detail.complete(true);
     });
   }*/ //making it up




  /*preventReorder(e) {
    //
    this.offset = {
      x: e.target.offsetLeft - e.clientX,
      y: e.target.offsetTop - e.clientY
    };
  }*/

  /*startReorder(e) {
    //
    if (!this.reorder) return;
    //
    this.reorderObj=e.target;
    this.mousePos={
      x:e.clientX,
      y:e.clientY,
    };
    //
    this.reorderState=true;
    this.reorderObj.style.
    position = "absolute";
  }

  inReorder(e) {
    if(!this.reorderState)return;
    this.reorderObj.style.left = (this.reorderObjPos.x + (e.clientX - this.mousePos.x)) + "px";
    this.reorderObj.style.top = (this.reorderObjPos.y + (e.clientY - this.mousePos.y)) + "px";
  }

  stopReorder() {
    if (!this.reorderState) return;
    this.reorderState=false;
  } */
}