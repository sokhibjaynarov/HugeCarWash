import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { ClientsComponent } from './components/clients/clients/clients.component';
import { ClientComponent } from './components/clients/client/client.component';
import { UpdateClientComponent } from './components/clients/update-client/update-client.component';
import { DeleteClientComponent } from './components/clients/delete-client/delete-client.component';
import { DeleteEmployeeComponent } from './components/employees/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './components/employees/update-employee/update-employee.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { EmployeesComponent } from './components/employees/employees/employees.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { OrderComponent } from './components/orders/order/order.component';
import { OrdersComponent } from './components/orders/orders/orders.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { DeleteOrderComponent } from './components/orders/delete-order/delete-order.component';
import { UpdateOrderComponent } from './components/orders/update-order/update-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './modules/shared/shared.module';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddClientComponent,
    ClientsComponent,
    ClientComponent,
    UpdateClientComponent,
    DeleteClientComponent,
    DeleteEmployeeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    EmployeesComponent,
    EmployeeComponent,
    OrderComponent,
    OrdersComponent,
    AddOrderComponent,
    DeleteOrderComponent,
    UpdateOrderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent},
      { path: 'add-order', component: AddOrderComponent},
      { path: 'update-order/:id', component: UpdateOrderComponent},
      { path: 'order/:id', component: OrderComponent},
      { path: 'delete-order/:id', component: DeleteOrderComponent},
      { path: 'employees', component: EmployeesComponent},
      { path: 'add-employee', component: AddEmployeeComponent},
      { path: 'update-employee/:id', component: UpdateEmployeeComponent},
      { path: 'employee/:id', component: EmployeeComponent},
      { path: 'delete-employee/:id', component: DeleteEmployeeComponent},
      { path: 'clients', component: ClientsComponent},
      { path: 'add-client', component: AddClientComponent},
      { path: 'update-client/:id', component: UpdateClientComponent},
      { path: 'client/:id', component: ClientComponent},
      { path: 'delete-client/:id', component: DeleteClientComponent}
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AutocompleteLibModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
