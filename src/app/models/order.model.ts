import { Item } from "./item.model";
import { OrderError } from "./order-error.model";

export interface Order {
    orderId: number;
    orderItems: Item[];
    table: string;
    orderCost: number;
    orderReceived: Date;
    orderDelivered: Date;
    orderErrors: OrderError[];
    orderStatus: number;
}
