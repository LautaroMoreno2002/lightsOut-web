import { Component } from '@angular/core';
import { ConfigFormComponent } from './config-form/config-form.component';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ConfigFormComponent,
     BoardComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  finished: boolean = false;
  userName: String = 'Pepito';
  level: number = 1;
  type: number = 1;

  stateBoard($event: boolean) {
    this.finished = $event;
    console.log(this.finished);
    
  }
  catchName($event1: string) {
    this.userName = $event1;
  }
  catchLevel($event2: number) {
    this.level = $event2;
  }
  catchType($event3: number) {
    this.level = $event3;
  }
}
