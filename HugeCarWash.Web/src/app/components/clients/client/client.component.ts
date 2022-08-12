import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client, IClient } from 'src/app/interfaces/client';
import { IOrder } from 'src/app/interfaces/order';
import { ClientService } from 'src/app/services/client/client.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client!: Client;
  orders!: IOrder[];
  clientOrders!: IOrder[];

  constructor( private service: ClientService, 
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    this.client = (await this.service.getClient(this.route.snapshot.params.id));

    this.orders = (await this.orderService.getOrders());
    
    this.clientOrders = await this.getClientOrders(this.orders, this.client);

  }

  async getClientOrders(orders: IOrder[], client: Client): Promise<any[]> {
    return orders.filter(order => order.userId === client.id);
  }

  showOrder(id: string): void {
    this.router.navigate(['/order/' + id]);
  }

}
