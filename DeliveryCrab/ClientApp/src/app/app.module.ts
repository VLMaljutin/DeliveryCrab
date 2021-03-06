import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from './service/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { KrustycrubComponent } from './krustycrub/krustycrub.component';
import { RestaurantService } from './service/restaurant.service';
import { ChumbucketComponent } from './chumbucket/chumbucket.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { BasketComponent } from './basket/basket.component';
import { ProductService } from './service/product.service';
import { BasketService } from './service/basket.service';
import { OrderService } from './service/order.service';
import { OrdersComponent } from './orders/orders.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    KrustycrubComponent,
    ChumbucketComponent,
    RestaurantsComponent,
    BasketComponent,
    OrdersComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path:'login', component: LoginComponent},
      {path:'register', component: RegisterComponent},
      {path:'account', component:AccountComponent},
      {path:'restaurants', component:RestaurantsComponent},
      {path:'krustycrub', component:KrustycrubComponent},
      {path:'chumbucket', component:ChumbucketComponent},
      {path:'basket', component:BasketComponent},
      {path:'orders', component:OrdersComponent}
    ]),


  ],
  providers: [UserService, RestaurantService, ProductService, BasketService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
