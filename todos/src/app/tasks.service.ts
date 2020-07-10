import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Task } from "./task.model";


@Injectable({providedIn: "root"})
export class TaskService{
    private tasks: Task[] = [];
    private taskadd = new Subject<Task>();
    private doneTask = new Subject<Task>();

    taskreflect$ = this.taskadd.asObservable();
    donereflect$ = this.doneTask.asObservable();

    readonly url = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }
    

    getTasks() {
        return this.http.get(this.url);
    }

    addTask(formdata: Task) {
        this.taskadd.next(formdata);
        console.log(this.taskadd.next(formdata));
        
        return this.http.post<Task>(this.url, formdata).subscribe(
            data => {
                this.tasks.push(data);
            }
        );
    }

    deleteTask(id){
        return this.http.delete(this.url + id);
    }

    updateStatus(status:Task){
        this.doneTask.next(status);
        console.log(this.doneTask.next(status));
        
        this.taskadd.next(status);
        console.log(this.taskadd.next(status));


        return this.http.put(this.url + status._id, status);
    }
}