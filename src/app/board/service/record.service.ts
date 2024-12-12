import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private localStorageKey: string;
  private levels: number[];

  setUser(_user: string) {
    this.localStorageKey = _user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(0));
  }
  getRecords(): number[] {
    return (
      JSON.parse(localStorage.getItem(this.localStorageKey) as string) || []
    );
  }
  agregarRecord(_record: number, _level: number) {
    const records = this.getRecords();
    records[_level] =_record;
    localStorage.setItem(this.localStorageKey, JSON.stringify(records));
  }
}
