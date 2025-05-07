import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([]);

  newTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      // Validators.pattern(/^\S*$/)
    ]
  });

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks =  this.tasks();
    if(filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if(filter === 'completed'){
      return tasks.filter(task => task.completed );
    }
    return tasks;
  });

  constructor(){
    // effect(() =>{
    //   const tasks = this.tasks();
    //   localStorage.setItem('tasks', JSON.stringify(tasks))
    //   console.log('Run effect')
    // })
  }
  injector = inject(Injector)
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks)
    }
    this.trackTasks();
  }
  trackTasks(){
    effect(() =>{
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log('Run effect')
    },{injector: this.injector});
  }

  changeHandler(event: Event){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value !== ''){
        this.addTask(this.newTaskCtrl.value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask])
  }

  deleteTaks(index: number){
    this.tasks.update((tasks) => tasks.filter((task, position)=> position !== index))
  }
  updateTask(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((tasks, position) =>{
        if(position === index){
          return {
            ...tasks,
            completed: !tasks.completed
          }
        } else {
          return tasks;
        }
      })
    })
  }
  updateTaskEditingMode(index: number){
    this.tasks.update(prevState => {
      return prevState.map((task, position)=>{
        if(position === index){
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })

    })
  }
  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState => {
      return prevState.map((task, position)=>{
        if(position === index){
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      })

    })
  }
  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }
}
