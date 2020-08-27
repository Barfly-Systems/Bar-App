import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from './../../models/order.model';
import { GroupedArray } from './../../models/GroupedArray';


@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  @Output() completeOrderEvent: EventEmitter<Order> = new EventEmitter();
  @Output() printOrderEvent: EventEmitter<Order> = new EventEmitter();

  columnsToDisplay = ['ID', 'Product', 'Qty', 'Size', 'Cost']

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) {
    console.log(data);
   }

  ngOnInit(): void {
    console.log(this.data);
  }


  cancelOrder = (e) => {
    console.log(e);
  } 

  completeOrder = (e: Order) => {
    this.completeOrderEvent.emit(e);
  }

  printOrder = (e: Order) => {
    this.printOrderEvent.emit(e);
  }
}


