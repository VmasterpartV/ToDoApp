import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/tasks';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  newTask: boolean = true;

  constructor(private dialogRef: MatDialogRef<TaskFormComponent>, @Inject(MAT_DIALOG_DATA) public task: Task) {
    if (task.name) {
      this.newTask = false;
    }
    this.taskForm = new FormGroup({
      name: new FormControl(task.name, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskForm.reset();
      this.dialogRef.close(task);
    } else {
      // Marcar los campos inválidos si es necesario
      this.taskForm.markAllAsTouched();
    }
  }
}
