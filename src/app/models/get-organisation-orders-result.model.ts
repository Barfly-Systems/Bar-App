declare interface GetOrganisationOrders_Result {
    id: number;
    tableNumber: string;
    cost: number;
    qty: number;
    received: string;
    delivered?: string;
    orderStatus: number;
}