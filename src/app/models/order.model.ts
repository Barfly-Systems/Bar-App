import { OrderItem } from "./order-item.model";
import { OrderError } from "./order-error.model";
import { GroupedArray } from './GroupedArray';

export interface Order {
    id: number;
    items: GroupedArray<OrderItem>[];
    tableNumber: string;
    cost: number;
    received: Date;
    delivered: Date;
    orderErrors?: OrderError[];
    orderStatus?: number;
}
