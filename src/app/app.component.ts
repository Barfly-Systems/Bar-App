import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Components

//Services
import { ApiService } from './services/api.service';
import { AudioService } from "./services/audio.service";

//Models
import {  Order } from './models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  orderList: Order[] = [];

  constructor(private api: ApiService, private audio: AudioService){}

  ngOnInit(){
    this.generateOrders();
  }

  mockdataIterator: number = 0;
  generateOrders = () => {
    let min = 1;
    let max = 20;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    setInterval(() => {
      let thisOrder:Order = this.api.generateMockData(this.mockdataIterator);
      this.orderList.push(thisOrder);
      this.orderList = [...this.orderList];
      this.audio.playPing();
      this.mockdataIterator++;
      console.log(this.orderList);
    }, 1000 * rand);
  }
  
}
