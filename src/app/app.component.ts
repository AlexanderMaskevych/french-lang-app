import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home/home.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {

  constructor() {
  }
}
