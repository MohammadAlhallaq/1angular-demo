import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';



@Injectable()
export class TodoService {

  todoList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }


  getTodoList()
  {
    this.todoList = this.db.list('titles');
    return this.todoList;
  }

   onadd(title: string)
   {
    this.todoList.push({
      title: title,
      isChecked: false
    });
   }


  checkOrUnCheckTitle($key: string, flag: boolean)
  {
    this.todoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string)
  {
    this.todoList.remove($key);
  }

}
