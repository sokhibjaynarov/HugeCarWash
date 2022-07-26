import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { IOrder } from 'src/app/interfaces/order';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee!: IEmployee;
  orders!: IOrder[];
  employeeOrders!: IOrder[];

  constructor( private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  async ngOnInit(): Promise<void> {
    this.employee = (await this.service.getEmployee(this.route.snapshot.params.id));

    this.orders = (await this.orderService.getOrders());

    this.employeeOrders = await this.getEmployeeOrders(this.orders, this.employee);

  }

  // async getEmployee(id: string) {
  //   return (await this.service.getEmployee(id)).subscribe((data: IEmployee) => {
  //     return data;
  //   });
  // }

  // async getOrders(){
  //   return (await this.orderService.getOrders()).subscribe((data: IOrder[]) => {
  //     return data;
  //   });
  // }

  async getEmployeeOrders(orders: IOrder[], employee: IEmployee): Promise<any[]> {
    return orders.filter(order => order.employeeId === employee.id);
  }

  showOrder(id: string): void {
    this.router.navigate(['/order/' + id]);
  }
}
