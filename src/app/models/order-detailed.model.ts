import { Order } from "./order.model";

export interface OrderDetailed extends Order
{
    tableNumber: string;
}