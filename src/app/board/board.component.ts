import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Celda } from './celda';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() userName: string = 'Pepito123';
  @Input() boardLength: number = 3;
  @Input() type: string = 'C';
  @Output() finish = new EventEmitter<boolean>();
  board: Celda[][] = [];
  score: number = 0;
  record: number = 0;

  ngOnInit(): void {
    this.startBoard();
    this.startLights();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['boardLength'].currentValue !=
      changes?.['boardLength'].previousValue
    ) {
      this.boardLength = changes?.['boardLength'].currentValue;
    }
  }
  startBoard(): void {
    for (let row = 0; row < this.boardLength; row++) {
      this.board[row] = [];
    }
  }
  startLights(): void {
    for (let row = 0; row < this.boardLength; row++) {
      for (let col = 0; col < this.boardLength; col++) {
        let state = Math.round(Math.random() + 1) === 1;
        this.board[row][col] = new Celda(state);
      }
    }
  }
  lightsOut(): boolean {
    let lightsOut = false;
    for (let row = 0; row < this.boardLength; row++) {
      for (let col = 0; col < this.boardLength; col++) {
        lightsOut = lightsOut || this.board[row][col].getState();
      }
    }
    return !lightsOut;
  }
  pushLight(_row: number, _col: number): void {
    if (this.lightsOut() == true) 
      this.finish.emit(true); 
    else {
      this.board[_row][_col].offState();
      this.score++;
      if (this.type == 'C') {
        this.rowsLightOnC(_row, _col);
        this.columnsLightOnC(_row, _col);
      } 
      else if (this.type == 'V') {
        this.rowsLightOnV(_row, _col);
        this.columnsLightOnV(_row, _col);
      }
       if (this.lightsOut() == true) 
        this.finish.emit(true);
    }
  }
  rowsLightOnC(_row: number, _col: number): void {
    let rowBefore = _row-1, rowAfter = _row+1;
    if (_row > 0 && _row < this.boardLength-1) {
      this.board[rowBefore][_col].offState();
      this.board[rowAfter][_col].offState();
    } else if (_row == 0) {
      this.board[rowAfter][_col].offState();
    } else if (_row == this.boardLength-1) {
      this.board[rowBefore][_col].offState();
    }
  }

  columnsLightOnC(_row: number, _col: number): void {
    let colBefore = _col-1, colAfter = _col+1;
    if (_col > 0 && _col < this.boardLength - 1) {
      this.board[_row][colBefore].offState();
      this.board[_row][colAfter].offState();
    } else if (_col == 0) {
      this.board[_row][colAfter].offState();
    } else if (_col == this.boardLength - 1) {
      this.board[_row][colBefore].offState();
    }
  }

  rowsLightOnV(_row: number, _col: number): void {
    for (let row = 0; row < this.boardLength; row++) {
      if (row != _row)
        this.board[row][_col].offState();
    }
  }

  columnsLightOnV(_row: number, _col: number): void {
    for (let col = 0; col < this.boardLength; col++) {
      if (col != _col)
        this.board[_row][col].offState();
    }
  }
}