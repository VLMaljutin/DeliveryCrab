import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Basket } from '../models/basket';
import { Order } from '../models/order';
import { BasketService } from '../service/basket.service';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  id_list:Array<any> = [];
  products:Array<any> = [];
  count:Array<any> = [];
  price:number = 0;
  description:string = '';
  success:boolean = false;
  test:number|undefined = 0;
  formsEdit!:FormGroup;

  constructor(public basketService:BasketService,private fb: FormBuilder, public orderService:OrderService,
    public userService:UserService) {}
  ngOnInit(){
    this.basketService.loadBasket();
    this.orderService.loadOrder();
    this.initForm();
  }
  initForm(){
    this.formsEdit = this.fb.group({
      address:['',[
        Validators.required
      ]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formsEdit.controls[controlName];
    const result = control.invalid && control.touched;
      return result;
    }
  placeAnOrder(){
    const control = this.formsEdit.controls;
      if(this.formsEdit.invalid){
        Object.keys(control)
        .forEach(controlName => control[controlName].markAsTouched());
        return;
      }
    for(let b of this.basketService.baskets){
      this.id_list.push(b.id)
      this.products.push(b.productname);
      this.count.push(b.count);
      this.price +=b.cost!;
    }
    for (let i=0;i<this.products.length;i++){
      this.description +=this.products[i] + " " + String(this.count[i]) + "шт.\n" ;
    }
    this.orderService.order.data = new Date();
    this.orderService.order.userid = this.userService.log_user.id;
    this.orderService.order.description = this.description;
    this.orderService.order.price = this.price;
    this.orderService.order.status = 'Сформирован';
    this.orderService.postOrder(this.orderService.order)
      .subscribe((data: Order)=>this.orderService.orders.push(data))
    for (let i of this.id_list){
      this.basketService.deleteProduct(i)
        .subscribe(data=>this.basketService.loadBasket)
    }
    this.success = true;
    this.orderService.order.address = '';
  }
  delete(b:Basket){
    this.basketService.deleteProduct(b.id)
      .subscribe(data=>this.basketService.loadBasket());
  }
  editCount(b: Basket){
    this.basketService.basket = b;
    this.test = this.basketService.basket.count;
  }
  update(){
    this.basketService.updateCount(this.basketService.basket)
      .subscribe(data=>this.basketService.loadBasket());
    this.cancel();
  }
  cancel(){
    this.basketService.basket.count = this.test;
    this.basketService.basket = new Basket();
  }
}
