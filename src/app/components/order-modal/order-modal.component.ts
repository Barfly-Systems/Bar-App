import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from './../../models/order.model';
import { GroupedArray } from './../../models/GroupedArray';
import { OrderModalStates } from './../../models/order-modal-states.enum';
import { OrderItem } from 'CiboBar-win32-x64/resources/app/src/app/models/order-item.model';
import { StateService } from 'CiboBar-win32-x64/resources/app/src/app/services/state.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  modalStateOptions = OrderModalStates;

  modalState: number = OrderModalStates.OrderDetails;

  @Output() completeOrderEvent: EventEmitter<Order> = new EventEmitter();
  @Output() printOrderEvent: EventEmitter<Order> = new EventEmitter();
  @Output() reloadOrderListEvent: EventEmitter<boolean> = new EventEmitter();

  columnsToDisplay = ['ID', 'Product', 'Qty', 'Size', 'Cost']


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {order: Order, items: OrderItem[]}, 
    private state: StateService,
    private api: ApiService
    ) {
    console.log(data);
   }

  ngOnInit(): void {
    console.log(this.data);
  }


  cancelOrder = (e: {order: Order, items: OrderItem[]}) => {
    console.log(e);
  } 

  completeOrder = (e: {order: Order, items: OrderItem[]}) => {
    this.completeOrderEvent.emit(e.order);
  }

  printOrder = (e: {order: Order, items: OrderItem[]}) => {
    this.printOrderEvent.emit(e.order);
  }

  openActionSelect = (id: number) => {
    this.modalState = this.modalStateOptions.ActionSelect;
  }

  reloadOrders = (e) => {
    // this.api.getAllOrders(1000012, null).subscribe((data: any[]) => {
    //   this.state.setAllOrders(data);
    // })
    this.reloadOrderListEvent.emit(true);
  }
}


