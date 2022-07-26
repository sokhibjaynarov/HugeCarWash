import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor( private service: EmployeeService,
    private router: Router) { }

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    // (await this.service.createEmployee(this.form.value)).subscribe((data: IEmployee) => {
    //   this.router.navigate(["/employees"]);
    // }, error => {
    //   console.log(error);
    // });
    await this.service.createEmployee(this.form.value);
    this.router.navigate(["/employees"]);
  }

}
