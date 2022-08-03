import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IClient } from 'src/app/interfaces/client';
import { IEmployee } from 'src/app/interfaces/employee';
import { IOrder, IOrderDto } from 'src/app/interfaces/order';
import { ClientService } from 'src/app/services/client/client.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // orders!: IOrder[];
  // employees!: IEmployee[];
  // clients!: IClient[];

  orderDtos!: IOrderDto[];

  constructor( private service: OrderService,
    private router: Router,
    private employeeService: EmployeeService,
    private clientService: ClientService,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    // (await this.service.getOrders()).subscribe((data: IOrder[]) => {
    //   this.orders = data;
    // },
    // (error: any) => {
    //   this.toastr.error(error.error.message, 'Error');
    // });

    //this.orders = await this.service.getOrders();

    // (await this.employeeService.getEmployees()).subscribe((data: IEmployee[]) => {
    //   this.employees = data;
    // },
    // (error: any) => {
    //   this.toastr.error(error.error.message, 'Error');
    // });

    //this.employees = await this.employeeService.getEmployees();

    // (await this.clientService.getClients()).subscribe((data: IClient[]) => {
    //   this.clients = data;
    // },
    // (error: any) => {
    //   this.toastr.error(error.error.message, 'Error');
    // });

    //this.clients = await this.clientService.getClients();

    this.orderDtos = await this.service.getAllOrders();
  }

  showOrder(id: string): void{
    this.router.navigate(["/order", id]);
  }

  // getEmployeeName(employeeId: string): (string | null){
  //   let name = this.employees.find(employee => employee.id === employeeId)?.firstName;

  //   if (name != null) {
  //     return name;
  //   }
  //   return null;
  // }

  // getClientName(clientId: string): (string | null){
  //   let name = this.clients.find(client => client.id === clientId)?.firstName;
  //   if (name) {
  //     return name;
  //   }
  //   return null;
  // }

}
