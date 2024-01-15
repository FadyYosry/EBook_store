import { CommonModule,ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FavService } from '../../Services/fav/fav.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css',
})
export class FavComponent implements OnInit {

  user_id:any;
  cartItems:any[]=[]
  constructor(private fire_auth:AuthService,private fav:FavService, private ViewportScroller:ViewportScroller)
  {
    this.user_id=this.fire_auth.myuser;
    console.log("user id ",this.user_id)
    this.ViewportScroller.scrollToPosition([0, 0]);
  }
  ngOnInit(): void {
if(this.user_id!="notfound")
{
  this.fav.getAllFromFav(this.user_id).subscribe(res=>{
    this.cartItems=[]
    for (let i = 0; i < res.length; i++) {
      this.cartItems.push(res[i]);
   }}); 
}
  }

  removeItem(bookid:string){
    this.fav.deleteProductFromFav(bookid,this.user_id);
  }

}
