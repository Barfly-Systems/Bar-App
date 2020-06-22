import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from "@angular/material/dialog";

import { OrderModalComponent } from '../order-modal/order-modal.component';

import { Order } from './../../models/order.model';
import { OrderItem } from '../../models/order-item.model';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { type } from 'os';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MainListComponent implements OnInit, OnChanges {
  
  
  msgs: any[] = [];

  @Output() completeOrderEvent: EventEmitter<Order> = new EventEmitter();

  // columnsToDisplay = ['ID', 'Table', 'Qty', 'Total', 'Time', 'Issue', 'Status'];
  // expandedElement: Order | null;

  @Input() orderList: Order[];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes); 
  }

  columnsToDisplay = ['ID', 'Table', 'Qty', 'Total', 'Time', 'Issue', 'Status'];
  expandedElement: Order | null;

  displayOrder= (order: Order) => {
    const dialogRef = this.dialog.open(OrderModalComponent, {
      width: '80%',
      data: order
    });
    const subscribeDialog = dialogRef.componentInstance.completeOrderEvent.subscribe((completedOrder: Order) => {
      this.completeOrderEvent.emit(completedOrder);
      dialogRef.close();
    })
    const printSubscribeDialog = dialogRef.componentInstance.printOrderEvent.subscribe((orderToPrint: Order) => {
      dialogRef.close();
      alert(`Printing order #${orderToPrint.orderId}`);
      
    })

    dialogRef.afterClosed().subscribe(result => {
      subscribeDialog.unsubscribe();
      printSubscribeDialog.unsubscribe();
    })
  }
}
