import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Celda } from './celda';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  @Input() boardLength: number = 3;
  @Input() mod?: number;
  @Input() userName: string = 'Pepito';
  @Output() finish = new EventEmitter<boolean>();
  board: Celda[][] = [];
  
  score: number = 0;

  ngOnInit(): void {
    this.startBoard();
    this.startLights();
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

  pushLight(_row: number, _col: number): void {
    if (this.playState() === true) {
      this.finish.emit(true);
    } else {
      this.board[_row][_col].offState();
      this.score++;
      if (this.mod == 1) {
        this.columnsLightOnM1(_row, _col);
        this.rowsLightOnM1(_row, _col);
      } else {
        this.columnsLightOnM2(_row, _col);
        this.rowsLightOnM2(_row, _col);
      }
      if (this.playState() === true) {
        this.finish.emit(true);
      }
    }
  }

  playState() {
    let state = false;
    for (let row = 0; row < this.boardLength; row++) {
      for (let col = 0; col < this.boardLength; col++) {
        state = state || this.board[row][col].getState();
      }
    }
    return state === false; // Si es true, hay una celda encendida
  }

  rowsLightOnM1(_row: number, _col: number): void {
    let rowAnt = _row - 1,
      rowPost = _row + 1;
    if (_row === 0) this.board[rowPost][_col].offState();
    else if (_row === this.boardLength - 1) this.board[rowAnt][_col].offState();
    else {
      this.board[rowAnt][_col].offState();
      this.board[rowPost][_col].offState();
    }
  }

  columnsLightOnM1(_row: number, _col: number): void {
    let colAnt = _col - 1,
      colPost = _col + 1;
    if (_col === 0) this.board[_row][colPost].offState();
    else if (_col === this.boardLength - 1) this.board[_row][colAnt].offState();
    else {
      this.board[_row][colAnt].offState();
      this.board[_row][colPost].offState();
    }
  }

  rowsLightOnM2(_row: number, _col: number): void {
    for (let row = 0; row < this.boardLength; row++)
      if (row != _row) this.board[row][_col].offState();
  }

  columnsLightOnM2(_row: number, _col: number): void {
    for (let col = 0; col < this.boardLength; col++)
      if (col != _col) this.board[_row][col].offState();
  }
}