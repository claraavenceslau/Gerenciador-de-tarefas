import { Component } from '@angular/core';
import { Gerenciador } from './components/gerenciador/gerenciador';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Gerenciador],
  templateUrl: './app.html',
})
export class App {
}