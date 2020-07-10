import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../task.model';
import { Subscription } from "rxjs";

import { TaskService } from "../tasks.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {

  private taskssub: Subscription;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    taskService.taskreflect$.subscribe(
      dta => {
        this.tasks.push(dta);
        console.log("1"+dta);
        this.ngOnInit();
      }
    )
  }

  ngOnInit() {
    this.tasks= [];
    
    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        console.log(this.tasks);
      }
    );
  }

  ngOnDestroy() {
    this.taskssub.unsubscribe();  
  }

  

  deleteTask(id){
    this.taskService.deleteTask(id).subscribe(
      (data) => {
        if (data) {
          for(let i=0; i<this.tasks.length; i++){
            if (this.tasks[i]._id == id) {
              this.tasks.splice(i,1);
            }
          }
        }
      }
    );
  }

  updateTask(task){
    console.log(task);
    
    var status = {
      _id: task._id,
      taskname: task.taskname,
      description: task.description,
      repeattask: task.repeattask,
      isCompleted: !task.isCompleted
    }
    console.log(status);

    this.taskService.updateStatus(status).subscribe(
      () => {
        this.ngOnInit();

        console.log(task.isCompleted);
        
        task.isCompleted = !task.isCompleted
        console.log(task.isCompleted);
      }
    )
  }

}
