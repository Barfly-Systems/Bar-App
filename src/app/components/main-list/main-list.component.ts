import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from "@angular/material/dialog";

import { OrderModalComponent } from '../order-modal/order-modal.component';

import { Order } from './../../models/order.model';
import { OrderItem } from '../../models/order-item.model';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { type } from 'os';
import { StateService } from 'src/app/services/state.service';
import { ApiService } from 'src/app/services/api.service';
// import { OrderDetailed } from 'CiboBar-win32-x64/resources/app/src/app/models/order-detailed.model';

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

  @Input() orderList: Order[] = [];
  orders: Order[];
  constructor(public dialog: MatDialog, private state: StateService, private api: ApiService) { }

  ngOnInit(): void {
    this.state.ordersChange.subscribe(data => {
      this.orderList = data;
      console.log(this.orderList);
    })
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes); 
  }

  columnsToDisplay = ['ID', 'Table', 'Qty', 'Total', 'Time', 'Issue', 'Status'];
  expandedElement: Order | null;

  displayOrder= (order: Order) => {
    this.api.getOrderItems(order.id, this.state.organisationId).subscribe(orderItems => {
      const dialogRef = this.dialog.open(OrderModalComponent, {
        width: '80%',
        data: {
          order: order,
          items: orderItems
        }
      });
      const subscribeDialog = dialogRef.componentInstance.completeOrderEvent.subscribe((completedOrder: Order) => {
        this.completeOrderEvent.emit(completedOrder);
        dialogRef.close();
      })
      const printSubscribeDialog = dialogRef.componentInstance.printOrderEvent.subscribe((orderToPrint: Order) => {
        dialogRef.close();
        alert(`Printing order #${orderToPrint.id}`);
      })
      const reloadDialog = dialogRef.componentInstance.reloadOrderListEvent.subscribe((data: boolean) => {
        this.api.getAllOrders(this.state.state.organisationId, null).subscribe((data: Order[]) => {
          dialogRef.close();
          this.state.setAllOrders(data);
        })
      })
  
      dialogRef.afterClosed().subscribe(result => {
        subscribeDialog.unsubscribe();
        printSubscribeDialog.unsubscribe();
      })
    })
    
  }
}
