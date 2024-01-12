import { CommonModule,ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavService } from '../../Services/fav/fav.service';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css',
})
export class FavComponent implements OnInit {

  cartItems:any[]=[]
  constructor(private fav:FavService, private ViewportScroller:ViewportScroller)
  {
    this.ViewportScroller.scrollToPosition([0, 0]);
  }
  ngOnInit(): void {
    this.fav.getAllFromFav().subscribe(res=>{
      this.cartItems=[]
      for (let i = 0; i < res.length; i++) {
        this.cartItems.push(res[i]);
     }}); 
  }

  removeItem(bookid:string){
    this.fav.deleteProductFromFav(bookid);
  }

  buy() {}
}
