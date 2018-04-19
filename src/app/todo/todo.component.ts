import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {

  todoListArray: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoList().snapshotChanges()
      .subscribe(item => {
        this.todoListArray = [];
        item.forEach(record => {
          const x = record.payload.toJSON();
          x['$key'] = record.key;
          this.todoListArray.push(x);
        });

        // sort array isChecked false  -> true
        this.todoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }


  addList(itemTitle)
  {
    this.todoService.onadd(itemTitle.value);
    itemTitle.value = null;
  }


  alterCheck($key: string, isChecked)
  {
    this.todoService.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key : string)
  {
    this.todoService.removeTitle($key);
  }

}
