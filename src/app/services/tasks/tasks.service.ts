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
      tasks: [
        {
          name: 'Task 1',
          list: 'To Do',
          description: 'This is a description for task 1',
          dueDate: new Date()
        }
      ]
    },
    {
      name: 'In Progress',
      tasks: [
        {
          name: 'Task 2',
          list: 'In Progress',
          description: 'This is a description for task 2',
          dueDate: new Date()
        }
      ]
    },
    {
      name: 'In Review',
      tasks: [
        {
          name: 'Task 3',
          list: 'Done',
          description: 'This is a description for task 3',
          dueDate: new Date()
        }
      ]
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
