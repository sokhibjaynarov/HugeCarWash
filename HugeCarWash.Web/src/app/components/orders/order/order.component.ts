import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order!: IOrder;

  constructor( private service: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    // (await this.service.getOrder(this.route.snapshot.params.id)).subscribe(data => {
    //   this.order = data;
    // });
    this.order = (await this.service.getOrder(this.route.snapshot.params.id));
  }


}
