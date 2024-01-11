import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart/cart.service';

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

cartItems:any[]=[]
constructor(private cart:CartService)
{}
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

  buy() {}

}