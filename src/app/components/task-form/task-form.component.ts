import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      // Puedes agregar más campos aquí si es necesario
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Aquí puedes enviar los datos del formulario
      // o realizar otras acciones, como agregar la tarea a la lista
      console.log(this.taskForm.value);
    } else {
      // Marcar los campos inválidos si es necesario
      this.taskForm.markAllAsTouched();
    }
  }
}
