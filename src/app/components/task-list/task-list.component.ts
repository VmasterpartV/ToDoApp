import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskList, Task } from 'src/app/interfaces/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  
  table: TaskList[] = [];
  todo = [];
  inProgress = [];
  done = [];

  constructor(private tasksService: TasksService) { }

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
}
