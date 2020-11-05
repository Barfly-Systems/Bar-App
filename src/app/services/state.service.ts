import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { Subject } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderDetailed } from '../models/order-detailed.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
    providedIn: "root"
})
export class StateService{
    state: State = {
        orders: [],
        organisationId: null
    }

    
    ordersChange: Subject<Order[]> = new Subject<Order[]>();

    constructor(){
        this.ordersChange.subscribe((value) => {
            this.state.orders = value;
            console.log(this.state.orders);
        })
    }

    setOrders = (newOrder: OrderDetailed) => {
        this.ordersChange.next([...this.state.orders, newOrder]);
    }

    setAllOrders = (newOrders: OrderDetailed[]) => {
        this.ordersChange.next(newOrders);
        console.log(this.state.orders);
    }

    completeOrder = (completedOrder: Order) => {
        let completedOrderIndex = this.state.orders.map((e) => { return e.id }).indexOf(completedOrder.id);
        this.state.orders.splice(completedOrderIndex, 1);
        this.state.orders = [...this.state.orders];
    }

    get organisationId(): number{
        return this.state.organisationId;
    }


}