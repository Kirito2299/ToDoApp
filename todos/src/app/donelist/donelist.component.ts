import { Component, OnInit } from '@angular/core';
import { TaskService } from "../tasks.service";
import { Task } from '../task.model';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-donelist',
  templateUrl: './donelist.component.html',
  styleUrls: ['./donelist.component.css']
})
export class DonelistComponent implements OnInit {

  private donetaskssub: Subscription;

  done: Task[] = [];


  constructor(public taskService: TaskService) {
    taskService.donereflect$.subscribe(
      dta => {
        this.done.push(dta);
        console.log("1" + dta);
        this.ngOnInit();
      }
    )
  }

  ngOnInit() {
    this.done = [];

    this.taskService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.done = tasks;
        console.log("done"+ this.done);
        
      }
    );
  }

  ngOnDestroy() {
    this.donetaskssub.unsubscribe();
  }


  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(
      (data) => {
        if (data) {
          for (let i = 0; i < this.done.length; i++) {
            if (this.done[i]._id == id) {
              this.done.splice(i, 1);
            }
          }
        }
      }
    );
  }

  updateTask(task) {

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
        task.isCompleted = false
        this.ngOnInit();
      }
    );
  }

}
