import { AsyncPipe, CommonModule,ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart/cart.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,AsyncPipe],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})

export class AddToCartComponent implements OnInit{
  
  user_id:any;
cartItems:any[]=[]
constructor(private fire_auth:AuthService,private cart:CartService,private ViewportScroller: ViewportScroller)
{
  this.user_id=this.fire_auth.myuser;
  console.log("user id ",this.user_id)
  this.ViewportScroller.scrollToPosition([0, 0]);

}
  ngOnInit(): void {
    if(this.user_id!="notfound")
    {
      this.cart.getAllFromCart(this.user_id).subscribe(res=>{
        this.cartItems=[]
        for (let i = 0; i < res.length; i++) {
          this.cartItems.push(res[i]);
       }}); 
    }

}

  addToCart(bookid: string){
    this.cart.getoneFromCart(bookid,this.user_id).subscribe(
      res=>{
        res.numOfBookNeed=res.numOfBookNeed+1;
     this.cart.updateBookInToCart(res,bookid,this.user_id)     
      } 
     );}
   

  

  removeFromCart(bookid:string){

    this.cart.getoneFromCart(bookid,this.user_id).subscribe(
      res=>{
        if(res.numOfBookNeed>1){
          res.numOfBookNeed=res.numOfBookNeed-1;
          this.cart.updateBookInToCart(res,bookid,this.user_id)
        }
    
     
      } 
     );

  }

  removeItem(bookid:string){
    this.cart.deleteBookFromCart(bookid,this.user_id)
  }

  buy() {}

}