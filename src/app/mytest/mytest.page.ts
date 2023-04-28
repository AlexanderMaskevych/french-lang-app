import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-mytest',
  templateUrl: './mytest.page.html',
  styleUrls: ['./mytest.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MytestPage implements OnInit {

  ngOnInit() {
  }
  public segment: string = "list1";

  constructor() {}

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
