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
  userName: string = 'Pepito';
  level: number = 3;
  mod: string = 'C';

  stateBoard($event: any) {
    this.finished = $event;
    console.log(this.finished);
    
  }
  catchName($event1: string) {
    this.userName = $event1;
    console.log(this.userName);
  }
  catchLevel($event2: number) {
    this.level = $event2;
    console.log(this.level);
  }
  catchType($event3: string) {
    this.mod = $event3;
    console.log(this.mod);
  }
}
