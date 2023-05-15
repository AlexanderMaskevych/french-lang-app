import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.page.html',
  styleUrls: ['./congratulation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CongratulationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toMenu(){
    this.router.navigate(['menu']);
  }

}
