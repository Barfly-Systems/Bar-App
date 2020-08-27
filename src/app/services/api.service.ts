import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Order } from './../models/order.model';
import { OrderItem } from '../models/order-item.model';
import { GroupedArray } from './../models/GroupedArray';


import { ArrayHelpers } from './../helpers/array';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly _apiUrl = environment.apiUrl + "/api";

  constructor(private http: HttpClient, private arrayHelper: ArrayHelpers) { 
    console.log(this._apiUrl);
  }

  getAllOrders = (organisationId: number, statusId: number) => this.http.get(`${this._apiUrl}/allOrganisationOrders/${organisationId}/${statusId}`); 

  getOrderItems = (orderId: number, organisationId: number) => this.http.get(`${this._apiUrl}/getOrderItems/${orderId}/${organisationId}`);

  //THIS IS FOR DEV TESTING ONLY - DO NOT USE IN PRODUCTION

 generateMockData = (orderIterator: number) => {    const min = 0;
    let orderItems: OrderItem[] = this.generateItems();
    let groupedItems: GroupedArray<OrderItem>[] = this.arrayHelper.GroupArray<OrderItem>(orderItems, "itemId");
    let newOrder: Order = { id: 1000000 + orderIterator, items: groupedItems, tableNumber: Math.ceil(Math.random() * 100).toString(), cost: orderItems.reduce((a,b)=>{return a+b["itemCost"]},0), received: new Date(), delivered: null, orderErrors: [], orderStatus: 1 };
    return newOrder;
  }

  generateItems = (): OrderItem[] => {
    let products: OrderItem[] = [this.fosters, this.carling, this.coke, this.smirnoff, this.appleJuice, this.scratchings];
    let order: OrderItem[] = [];
    let max = 5;
    var rand = Math.ceil(Math.random() * max);
    // console.log(rand);
    // console.log(products[rand]);
    for(let i = 0;  i < rand; i++){
      let randomNum2 = Math.floor(Math.random() * products.length);
      order.push(products[randomNum2]);
    };
    return order;
  }

  generateModelItems = (index: number) => {
    let products: OrderItem[] = [this.fosters, this.carling, this.coke, this.smirnoff, this.appleJuice, this.fosters, this.carling, this.coke, this.smirnoff, this.appleJuice, this.scratchings];
    let groupedItems: GroupedArray<OrderItem>[] = this.arrayHelper.GroupArray<OrderItem>(products, "itemId");
    let newOrder: Order = { id: 1000000 + index, items: groupedItems, tableNumber: Math.ceil(Math.random() * 100).toString(), cost: products.reduce((a,b)=>{return a+b["itemCost"]},0), received: new Date(), delivered: null, orderErrors: [], orderStatus: 1 };
    // let grouped: any = this.arrayHelper.GroupArray<OrderItem>(newOrder.orderItems, "itemId");
    return newOrder;
  }

  fosters: OrderItem = new OrderItem(10000001, "Fosters", "Pint", 3.25, [],[], false, 1);
  carling: OrderItem = new OrderItem(10000002, "Carling", "Pint", 3.50, [],[], false, 1);
  coke: OrderItem = new OrderItem(10000003, "Coca Cola", "Half Pint", 2.00, [],[], false, 1);
  smirnoff: OrderItem = new OrderItem(10000004, "Smirnoff", "Single", 2.00, [],[], false, 1);
  appleJuice: OrderItem = new OrderItem(10000005, "Apple Juice", "330ml", 1.50, [],[], false, 1);
  scratchings: OrderItem = new OrderItem(10000006, "Pork Scratchings", "bag", 1.50, [],[], false, 1);
}
 
