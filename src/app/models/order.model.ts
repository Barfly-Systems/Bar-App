import { OrderItem } from "./order-item.model";
import { OrderError } from "./order-error.model";
import { GroupedArray } from './GroupedArray';

export interface Order {
    orderId: number;
    orderItems: GroupedArray<OrderItem>[];
    table: string;
    orderCost: number;
    orderReceived: Date;
    orderDelivered: Date;
    orderErrors: OrderError[];
    orderStatus: number;
}
