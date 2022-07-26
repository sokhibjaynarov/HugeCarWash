import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client, IClient } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  constructor( private service: ClientService, private router: Router ) { }

  async ngOnInit(): Promise<void> {
    this.clients = await this.service.getClients();
  }

  showClient(id: string): void {
    this.router.navigate(['/client/' + id]);
  }

  updateClient(id: string): void {
    this.router.navigate(['/update-client/' + id]);
  }

  deleteClient(id: string): void {
    this.router.navigate(['/delete-client/' + id]);
  }
}
