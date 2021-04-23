import { state, style, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Taks } from './task.model';
import { ToDoService } from './toDo.service';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css'],
  animations: [
    trigger('doneTask', [
      state('notDone', style({
        'text-decoration' : 'line-through'
      })),
      state('done',  style({
        'text-decoration' : 'none'
      })),
    ])
  ]
})
export class ToDosComponent implements OnInit,OnDestroy {
  toDo: boolean = false;
  tasks:Taks[] = [];
  sub:Subscription;
  message:string = 'Click here to add a taks!';
  todaysDate:string = formatDate(new Date(), 'dd/MM/yyyy', 'en');

  constructor(private taskService:ToDoService) { 
  }

  ngOnInit(): void {
    this.sub = this.taskService.tasksChanged.subscribe(data => {
      this.tasks = data;
    })

    this.tasks = this.taskService.getTasks();
  }

  onAnimate(index:number){
   
    this.taskService.updateDone(index);
  }

  onSave(){
    this.taskService.saveTasks();
  }

  onDelete(index:number){
    this.taskService.deleteTask(index);
  }

  onClear(){
    this.taskService.deleteAllTasks();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAddTask(data:string){
    const task:Taks = new Taks(data,'done',this.todaysDate);
    this.taskService.addTask(task);
    this.toDo = false;
    this.message = 'Click here to add a taks!';
  }

  
  addToDo() {
    this.message = '';
    this.toDo = true;
  }
}
