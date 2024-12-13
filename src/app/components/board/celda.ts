export class Celda {
  private state: boolean;

  constructor(_state: boolean) {
    this.state = _state;
  }
  newState(_state: boolean) {
    this.state = _state;
  }
  getState(): boolean {
    return this.state;
  }
  offState() {
    this.state = !this.state;
  }
}
