import { Component, signal } from '@angular/core';

import { FormControl, ReactiveFormsModule, Validators} from '@angular/forms'

@Component({
  selector: 'app-labs',
  imports: [ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  constructor(){
    this.colerCtrl.valueChanges.subscribe(value =>{
      console.log(value)
    })
  }
  title = 'todoapp';
  welcome:string = 'Hola';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ];
  tasksSugnal = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);
  name:string = 'Carlos';
  age:number = 38;
  disabled:boolean = true;
  img:string = 'https://w3schools.com/howto/img_avatar.png';
  persona = {
    name: 'Niculas',
    age: 18,
    img: 'https://w3schools.com/howto/img_avatar.png'
  }
  persona2 = signal ({
    name: 'Carlos',
    age: 18,
    img: 'https://w3schools.com/howto/img_avatar.png'
  })
  name2 = signal('Carlos');
  colerCtrl = new FormControl();
  widthCtrl = new FormControl(50, {
    nonNullable: true
  });
  nameCtrl = new FormControl('',{
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ]
  })

  clickHandler(){
    alert("Pase")
  }
  cahngeHandle(evnt: Event){
    // this.name = evnt.target
    const input = evnt.target as HTMLInputElement; // 👈 le decimos que es un input  
    this.name = input.value;
  }
  changeAge(evnt: Event){
    const input = evnt.target as HTMLInputElement; // 👈 le decimos que es un input  
    this.persona2.update(prevState =>{
      return{
        ...prevState,
        age: parseInt(input.value, 10)
      }
    })
  }
  changeName(evnt: Event){
    const input = evnt.target as HTMLInputElement; // 👈 le decimos que es un input  
    this.persona2.update(prevState =>{
      return{
        ...prevState,
        name: input.value
      }
    })
  }
  keydownHandler(evnt: Event){
    const input = evnt.target as HTMLInputElement; // 👈 le decimos que es un input  
    this.name = input.value;
  }
  precionsShift(){
    alert("Hola")
  }
  keydownSega(evnt: Event){
    const input = evnt.target as HTMLInputElement;
    this.name2.set(input.value)
  }


  
}
