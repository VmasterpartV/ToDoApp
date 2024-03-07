import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskList } from 'src/app/interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private taskSubject = new BehaviorSubject<TaskList[]>([]);
  taskTable$ = this.taskSubject.asObservable();

  table: TaskList[] = [
    {
      name: 'To Do',
      tasks: []
    },
    {
      name: 'In Progress',
      tasks: []
    },
    {
      name: 'In Review',
      tasks: []
    }
  ];

  constructor() { 
    const taskTable = localStorage.getItem('taskTable');
    if (taskTable) {
      this.taskSubject.next(JSON.parse(taskTable));
    } else {
      this.taskSubject.next(this.table);
    }
  }

  updateTaskTable(taskTable: TaskList[]): void {
    this.taskSubject.next(taskTable);
    localStorage.setItem('taskTable', JSON.stringify(taskTable));
  }
}
