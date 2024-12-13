import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { BoardComponent } from './components/board/board.component';
import { RecordService } from './services/record-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConfigFormComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnChanges {
  private _recordService = inject(RecordService);
  start: boolean = false;
  finished: boolean = false;
  userName: string = 'Pepito';
  level: number = 3;
  mod: string = 'C';
  score: number = 0;
  record: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['level'].previousValue != changes['level'].currentValue) {
      this.record = this._recordService.getRecord(this.level, this.mod);
    }
    if (changes['mod'].previousValue != changes['mod'].currentValue) {
      this.record = this._recordService.getRecord(this.level, this.mod);
    }
  }
  startGame() {
    this.start = true;
    this._recordService.setUserName(this.userName);
    this.record = this._recordService.getRecord(this.level, this.mod);
  }
  catchScore($event: number) {
    this.score = $event;    
  }
  stateBoard($event: any) {
    this.finished = $event;
    if (this.finished) {
      this._recordService.addRecord(this.score, this.level, this.mod);
      this.record = this._recordService.getRecord(this.level, this.mod);
    }
  }
  catchName($event1: string) {
    this.userName = $event1;
  }
  catchLevel($event2: number) {
    this.level = $event2;
  }
  catchType($event3: string) {
    this.mod = $event3;
  }
}
