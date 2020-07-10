import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from "../tasks.service";
import { TodolistComponent } from "../todolist/todolist.component";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    TodolistComponent
  }

  taskname = "";
  description = "";
  repeattask= "";

  onAdd(form: NgForm){
    if(form.invalid){
      return;
    }

    this.taskService.addTask(form.value);
    this.ngOnInit();
    form.reset({});
  }

}
