import { AsyncPipe, CommonModule,ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart/cart.service';
import { Router } from '@angular/router';

// interface Book {
//   title: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,AsyncPipe],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})

export class AddToCartComponent implements OnInit{
  
cartitem:any;
 result:number=0;
cartItems:any[]=[]
constructor(private cart:CartService,private ViewportScroller: ViewportScroller,private route:Router)
{
  this.ViewportScroller.scrollToPosition([0, 0]);

}
  ngOnInit(): void {
 this.cart.getAllFromCart().subscribe(res=>{
  this.cartItems=[]
  for (let i = 0; i < res.length; i++) {
    this.cartItems.push(res[i]);
 }}); 
}

  addToCart(bookid: string){
    this.cart.getoneFromCart(bookid).subscribe(
      res=>{
        res.numOfBookNeed=res.numOfBookNeed+1;
     this.cart.updateBookInToCart(res,bookid)     
      } 
     );}
   

  

  removeFromCart(bookid:string){

    this.cart.getoneFromCart(bookid).subscribe(
      res=>{
        if(res.numOfBookNeed>1){
          res.numOfBookNeed=res.numOfBookNeed-1;
          this.cart.updateBookInToCart(res,bookid)
        }
    
     
      } 
     );

  }

  removeItem(bookid:string){
    this.cart.deleteBookFromCart(bookid)
  }

  buy() {
    this.cart.getAllFromCart().subscribe(res=>{
      this.cartitem=res
      for (let i = 0; i < this.cartitem.length; i++) {
        const numOfBookNeed = this.cartitem[i].numOfBookNeed || 0;
        const price = +this.cartitem[i].price || 0;
        const discount = this.cartitem[i].discount || 0;
        if(this.cartitem[i].discount!=0)
        this.result += numOfBookNeed * price - (discount / 100) * price;     
        else 
        this.result += this.cartitem[i].numOfBookNeed * this.cartitem[i].price;
    }
    this.route.navigate(['/paypal', this.result]);
    })
    
  
  }

}