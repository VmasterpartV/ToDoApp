import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskList, Task } from 'src/app/interfaces/tasks';
import {MatDialog} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  
  table: TaskList[] = [];
  emptyTask: Task = {
    name: '',
    list: '',
    description: '',
    dueDate: new Date()
  };
  activeList: TaskList = {
    name: '',
    tasks: []
  };

  constructor(private tasksService: TasksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasksService.taskTable$.subscribe(taskTable => {
      this.table = taskTable;
      console.log(this.table);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // move item in the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // move item to another list
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.tasksService.updateTaskTable(this.table);
  }

  getTableIdsExcept(currentId: string): string[] {
    return this.table.map(list => list.name).filter(id => id !== currentId);
  }

  saveTask(list: TaskList, task: Task): void {
    list.tasks.push(task);
    this.tasksService.updateTaskTable(this.table);
    this.emptyTask = {
      name: '',
      list: '',
      description: '',
      dueDate: new Date()
    };
  }

  openDialog(task: Task, list: TaskList) {
    console.log(task);
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // Save or update the task
      if (result) {
        if (result.name) {
          task.name = result.name;
          task.description = result.description;
          task.dueDate = result.dueDate;
          this.saveTask(list, task);
        }
      }
    });
  }
}
