import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { OrderStatusUpdate } from './../../models/order-status-update.model';
import { GetOrderActions_Result } from './../../models/get-order-actions-result.model';


@Component({
  selector: 'app-action-select',
  templateUrl: './action-select.component.html',
  styleUrls: ['./action-select.component.scss']
})
export class ActionSelectComponent implements OnInit {

  @Input() orderId: number;
  @Output() statusUpdateAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  orderActions: GetOrderActions_Result[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    console.log(this.orderId);
    this.api.getOrderActions().subscribe((data: GetOrderActions_Result[]) => {
      this.orderActions = data;
    });
  }

  changeOrderStatus = (orderStatusId: number) => {
    let orderStatusUpdate: OrderStatusUpdate = {
      organisationId: 1000012,
      orderId: this.orderId,
      statusId: orderStatusId
    }
    this.api.updateOrderStatus(orderStatusUpdate).subscribe((data) => {
      console.log(data);
      this.statusUpdateAction.emit(true);
      
    })
  }
}
