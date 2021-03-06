import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GroupedArray } from './models/GroupedArray';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

//Components

//Services
import { ApiService } from './services/api.service';
import { AudioService } from "./services/audio.service";

//Models
import {  Order } from './models/order.model';
import { StateService } from './services/state.service';
import { OrderDetailed } from './models/order-detailed.model';

import { environment } from './../environments/environment';
import { AppConfig } from './services/app-config.service';
import { OrderStatusUpdate } from './models/order-status-update.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  protected organisationId: number = AppConfig.settings.terminalConfig.organisationId;


  readonly _apiUrl = environment.apiUrl;

  private _hubConnection: HubConnection;

  orderList: Order[] = [];

  constructor(private api: ApiService, private audio: AudioService, private ref: ChangeDetectorRef, private state: StateService){}

  ngOnInit(){
    console.log(this.organisationId);
    this.audio.playPing();
    this.state.state.organisationId = AppConfig.settings.terminalConfig.organisationId;
    this._hubConnection = new HubConnectionBuilder().withUrl(`${this._apiUrl}/notify?organisationId=${this.state.state.organisationId}`).build();
    console.log(this._hubConnection);
    this._hubConnection
      .start()
      .then(() => console.log("connection started!"))
      .then(() => this.getAllOrders())
      .catch(err => console.log('Error whilst establishing connection :('));

    

    this._hubConnection.on('BroadcastMessage', (type: string, payload: any) => {
      this.state.setOrders(payload.order);
      console.log({severity: type, summary: payload})
      this.audio.playPing();
    })
  }

  getAllOrders = () => {
    this.api.getAllOrders(this.state.state.organisationId, null).subscribe((data: Order[]) => {
      this.state.setAllOrders(data);
      // this.orderList = data;
      console.group("ORDER LIST");
      console.log(this.orderList);
      console.groupEnd();
    })
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
    // for(let i = 0; i < 3; i++){
    //   this.orderList.push(this.api.generateModelItems(i));
    //   this.orderList = [...this.orderList];  
    // }
  }

  completeOrder = (completedOrder: Order) => {
    let orderStatusUpdate: OrderStatusUpdate = {
      organisationId: this.state.state.organisationId,
      orderId: completedOrder.id,
      statusId: 6
    };
    this.api.updateOrderStatus(orderStatusUpdate).subscribe(data => {
      this.getAllOrders();
    })
    // this.orderList = [...this.orderList];
  }

}
