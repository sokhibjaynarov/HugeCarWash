import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, IClient } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  client!: Client;
  form!: FormGroup;
  id!: string;

  constructor( private service: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.client = (await this.service.getClient(this.id));

    this.form = new FormGroup({
      firstName: new FormControl(this.client.firstName, Validators.required),
      lastName: new FormControl(this.client.lastName, Validators.required),
      phoneNumber: new FormControl(this.client.phoneNumber, Validators.required),
      carNumber: new FormControl(this.client.carNumber, Validators.required),
      carModel: new FormControl(this.client.carModel, Validators.required),
      telegramId: new FormControl(this.client.telegramId, Validators.required),
    });
  }

  // form = new FormGroup({
  //   firstName: new FormControl(this.client.firstName, Validators.required),
  //   lastName: new FormControl(this.client.lastName, Validators.required),
  //   phoneNumber: new FormControl(this.client.phoneNumber, Validators.required),
  //   carNumber: new FormControl(this.client.carNumber, Validators.required),
  //   carModel: new FormControl(this.client.carModel, Validators.required),
  //   telegramId: new FormControl(this.client.telegramId, Validators.required),
  // });

  async onSubmit(): Promise<void> {
    // (await this.service.updateClient(this.form.value, this.id)).subscribe((data: IClient) => {
    //   this.router.navigate(["/clients"]);
    // });
    await this.service.updateClient(this.form.value, this.id);
    this.router.navigate(["/clients"]);
  }
}
