import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from './../models/order.model';
import { Item } from './../models/item.model';
import { generate } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly _apiUrl = '';

  constructor(private http: HttpClient) { }

  
  //THIS IS FOR DEV TESTING ONLY - DO NOT USE IN PRODUCTION

 generateMockData = (orderIterator: number) => {    const min = 0;
    let orderItems: Item[] = this.generateItems();
    let newOrder: Order = { orderId: 1000000 + orderIterator, orderItems: orderItems, table: Math.ceil(Math.random() * 100).toString(), orderCost: orderItems.reduce((a,b)=>{return a+b["itemCost"]},0), orderReceived: new Date(), orderDelivered: null, orderErrors: [], orderStatus: 1 };
    return newOrder;
  }

  generateItems = (): Item[] => {
    let products: Item[] = [this.fosters, this.carling, this.coke, this.smirnoff, this.appleJuice, this.scratchings];
    let order: Item[] = [];
    let max = 5;
    var rand = Math.ceil(Math.random() * max);
    console.log(rand);
    console.log(products[rand]);
    for(let i = 0;  i < rand; i++){
      let randomNum2 = Math.floor(Math.random() * products.length);
      order.push(products[randomNum2]);
    };
    return order;
  }

  fosters: Item = new Item(10000001, "Fosters", "Pint", 3.25, [],[], false, 1);
  carling: Item = new Item(10000002, "Carling", "Pint", 3.50, [],[], false, 1);
  coke: Item = new Item(10000003, "Coca Cola", "Half Pint", 2.00, [],[], false, 1);
  smirnoff: Item = new Item(10000004, "Smirnoff", "Single", 2.00, [],[], false, 1);
  appleJuice: Item = new Item(10000005, "Apple Juice", "330ml", 1.50, [],[], false, 1);
  scratchings: Item = new Item(10000006, "Pork Scratchings", "bag", 1.50, [],[], false, 1);
}
 
