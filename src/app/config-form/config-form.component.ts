import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './config-form.component.html',
  styleUrl: './config-form.component.css',
})
export class ConfigFormComponent implements OnInit {
  formConfig: FormGroup;
  userName: string;
  level: number;
  type: string;
  @Output() nameConfig: EventEmitter<string>;
  @Output() levelConfig: EventEmitter<number>;
  @Output() typeConfig: EventEmitter<string>;
  private formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.userName = 'Pepito';
    this.level = 3;
    this.type = 'C';
    this.nameConfig = new EventEmitter<string>();
    this.levelConfig = new EventEmitter<number>();
    this.typeConfig = new EventEmitter<string>();
    this.formConfig = this.formBuilder.group({
      userName: ['', Validators.required],
      level: [, Validators.required],
      type: [, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formConfig.get('userName')
    ?.valueChanges.subscribe(
      (data) => (this.userName = data)
    );
    this.formConfig.get('level')
      ?.valueChanges.subscribe(
        (data) => (this.level = data)
      );
    this.formConfig.get('type')
    ?.valueChanges.subscribe(
      (data) => (this.type = data)
    );
  }

  startGame(): void {
    this.nameConfig.emit(this.userName);
    this.levelConfig.emit(this.level);
    this.typeConfig.emit(this.type);
  }
  
}
