import { Component, OnInit } from '@angular/core';


import { FormGroup, FormBuilder,Validators } from '@angular/forms';

import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  public myForm: FormGroup;
  public student: Estudiante;
  constructor(private studentService: EstudianteService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      controlnumber: ['', [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]],
      curp: ['', [Validators.compose([Validators.required, Validators.pattern("^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
      "(([A-ZÑ&]{4})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$")])]],
      age: [0, [Validators.compose([Validators.required])]],
      active: [false, [Validators.compose([Validators.required])]]
    });
  }

  create() {
    this.student = {
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value
    }
    this.studentService.createStudent(this.student);
  }

}
