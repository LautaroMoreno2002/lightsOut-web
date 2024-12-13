import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  localStorageKey: string = "";
  
  constructor() { }

  setUserName(userName: string) {
    if (this.localStorageKey != userName) {
      this.localStorageKey = userName;    
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify({
          '3': {
            'C': 0,
            'V': 0,
          },
          '4': {
            'C': 0,
            'V': 0,
          },
          '5': {
            'C': 0,
            'V': 0,
          },
        })
      );
    }
  }
  getRecord(_level: number, _type: string): number {  
    return (
      JSON.parse(localStorage.getItem(this.localStorageKey) as string)[_level][_type]
    )
  }
  addRecord(_score: number, _level: number, _type: string) {
    if (_score < this.getRecord(_level,_type)) {
      let newHistory = JSON.parse(localStorage.getItem(this.localStorageKey) as string);
      newHistory[_level][_type] = _score;
      console.log(newHistory);
      localStorage.setItem(this.localStorageKey, JSON.stringify(newHistory));
    }
    if (this.getRecord(_level,_type) === 0) {
       let newHistory = JSON.parse(
         localStorage.getItem(this.localStorageKey) as string
       );
       newHistory[_level][_type] = _score;
       console.log(newHistory);
       localStorage.setItem(this.localStorageKey, JSON.stringify(newHistory));
    }
  }
}