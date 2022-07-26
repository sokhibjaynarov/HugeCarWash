import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee!: IEmployee;
  form!: FormGroup;
  id!: string;
  

  constructor( private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.employee = await this.service.getEmployee(this.id);
    this.form = new FormGroup({
      firstName: new FormControl(this.employee.firstName, Validators.required),
      lastName: new FormControl(this.employee.lastName, Validators.required),
      phoneNumber: new FormControl(this.employee.phoneNumber, Validators.required),
      telegramId: new FormControl(this.employee.telegramId, Validators.required),
    });
  }

  async onSubmit(): Promise<void> {
    // (await this.service.updateEmployee(this.form.value, this.id)).subscribe((data: IEmployee) => {
    //   this.router.navigate(["/employees"]);
    // });
    await this.service.updateEmployee(this.form.value, this.id);
    this.router.navigate(["/employees"]);
  }

}
