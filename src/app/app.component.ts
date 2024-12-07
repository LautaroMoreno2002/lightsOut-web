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
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lightsOut-web';
}
