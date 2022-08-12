export interface IOrder {
    id: string;
    price: number;
    userId: string;
    employeeId: string;
    orderDate: Date;
}

export class Order {
    public id!: string;
    public price!: number;
    public clientId!: string;
    public employeeId!: string;
    public orderDate!: Date;

    constructor(price: number, clientId: string, employeeId: string) {
        this.price = price;
        this.clientId = clientId;
        this.employeeId = employeeId;
    }

}

export interface IOrderDto {
    id: string;
    price: number;
    employeeName: string;
    carNumber: string;
}
