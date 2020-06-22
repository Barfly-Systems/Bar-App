import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GroupedArray } from './models/GroupedArray';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

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
  
  readonly _apiUrl = "http://35.214.106.155:44201";

  private _hubConnection: HubConnection;

  orderList: Order[] = [];

  constructor(private api: ApiService, private audio: AudioService, private ref: ChangeDetectorRef){}

  ngOnInit(){
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this._apiUrl}/notify`).build();
    this._hubConnection
      .start()
      .then(() => console.log("connection started!"))
      .catch(err => console.log('Error whilst establishing connection :('));

    this._hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
      console.log({severity: type, summary: payload})
      this.audio.playPing();
    })

    this.generateOrders();
  }

  mockdataIterator: number = 0;
  generateOrders = () => {
    // let min = 1;
    // let max = 20;
    // let rand = Math.floor(Math.random() * (max - min + 1) + min);
    // setInterval(() => {
    //   let thisOrder:Order = this.api.generateMockData(this.mockdataIterator);
    //   this.orderList.push(thisOrder);
    //   this.orderList = [...this.orderList];
    //   this.audio.playPing();
    //   this.mockdataIterator++;
    //   // console.log(this.orderList);
    // }, 1000 * rand);
    for(let i = 0; i < 3; i++){
      this.orderList.push(this.api.generateModelItems(i));
      this.orderList = [...this.orderList];  
    }
  }

  completeOrder = (completedOrder: Order) => {
    console.log("hello");
    console.log(completedOrder);
    let completedOrderIndex = this.orderList.map((e) => { return e.orderId }).indexOf(completedOrder.orderId);
    this.orderList.splice(completedOrderIndex, 1);
    this.orderList = [...this.orderList];
  }

}
