import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IClient } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    carNumber: new FormControl('', Validators.required),
    carModel: new FormControl('', Validators.required),
  })

  constructor( private service: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  async onSubmit() : Promise<void> {
    // (await this.service.createClient(this.form.value)).subscribe((data: IClient) => {
    //   this.router.navigate(["/clients"]);
    // }, (error: any) => {
    //   console.log(error);
    // });
    await this.service.createClient(this.form.value);
    this.router.navigate(["/clients"]);
  }

}
