import { Order } from './order.model';

export interface State{
    organisationId: number,
    orders: Order[]
}