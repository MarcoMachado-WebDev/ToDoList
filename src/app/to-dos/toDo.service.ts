import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Taks } from "./task.model";

@Injectable({providedIn:'root'})
export class ToDoService {
    tasksChanged = new Subject<Taks[]>();

    private tasks:Taks[] = [];

    // private tasks:Taks[] = [{
    //     content:'Acabar trabalho de casa!',
    //     done: 'done'
    // },{
    //     content:'Limpar a casa!',
    //     done: 'notDone'
    // }]


    addTask(task:Taks){

        this.tasks.push(task);
        localStorage.setItem('taskData',JSON.stringify(this.tasks));
        this.tasksChanged.next(this.tasks.slice());
    }

    deleteTask(index:number){
       
        this.tasks.splice(index,1);
        this.tasksChanged.next(this.tasks.slice());
    }

    deleteAllTasks(){
        this.tasks = [];
        localStorage.removeItem('taskData');
        this.tasksChanged.next(this.tasks.slice());
    }

    saveTasks() {
        console.log('yeah');
        localStorage.removeItem('taskData');
        localStorage.setItem('taskData',JSON.stringify(this.tasks));
    }

    updateDone(index:number){
        this.tasks[index].done === 'done' ? this.tasks[index].done = 'notDone' :this.tasks[index].done = 'done' 
        this.tasksChanged.next(this.tasks.slice());
    }

    getTasks(){
        if( localStorage.getItem('taskData') == null)
        {
            return this.tasks;
        }
        this.tasks = JSON.parse(localStorage.getItem('taskData') || '{}');
        return this.tasks;
    }

}