import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, addDoc, getDocs, getDoc, deleteDoc  } from '@angular/fire/firestore';

export class ToDo {
  id: string;
  title: string;
  description: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _storage: Storage | null = null;

  constructor(
    private firestore: Firestore,
    private Storage: Storage) {
      this.init();
    }

    async init(){
      const Storage = await this.Storage.create();
      this.Storage.create();
    }

    //  Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any){
      this._storage?.set(key, value);
    }

/*

    getData(){
      return this.Storage.get(STORAGE_KEY) || [];
    }

    async addData(item){
      const storedData = await this.Storage.get(STORAGE_KEY) || [];
      storedData.push(item);
      return this.Storage.set(STORAGE_KEY, storedData);
    }

    async removeItem(index){
      const storedData = await this.Storage.get(STORAGE_KEY) || [];
      storedData.splice(index, 1);
      return this.Storage.set(STORAGE_KEY, storedData);
    }
*/


  create(todo: ToDo) {
    todo.date = new Date().toISOString();
    return addDoc(collection(this.firestore, 'tasks'), todo);
  }

  getTasks() {
    return getDocs(collection(this.firestore, 'tasks'));
  }

  getTask(id: string) {
    return getDoc(doc(this.firestore, 'tasks', id));
  }

  update(id: string, todo: ToDo) {
    return setDoc(doc(this.firestore, 'tasks', id), todo, {merge: true});
  }

  delete(id: string) {
    return deleteDoc(doc(this.firestore, 'tasks', id));
  }
}
