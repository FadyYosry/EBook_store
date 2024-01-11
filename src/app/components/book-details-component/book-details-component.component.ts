
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute,  Router,  RouterModule } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { Observable } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { CardsSecComponent } from '../cards-sec/cards-sec.component';

@Component({
  selector: 'app-book-details-component',
  standalone: true,
  imports: [AsyncPipe,CommonModule,CardsSecComponent,RouterModule],
  templateUrl:'./book-details-component.component.html',
  styleUrl: './book-details-component.component.css',
})
export class BookDetailsComponentComponent implements OnInit {
 
book_id='';
book$!:Observable<Book_module>;
  constructor(
    private route:Router,
     bookurl: ActivatedRoute,
    private serve: AllBooksService,
    private cart: CartService,
    private fav: FavService,
  ) {
   this.book_id=bookurl.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.book$ = this.serve.getOneBook(this.book_id);
  }
 
  count = signal(0);
  counter:any;
  getStarsArray(num: number): number[] {
    const starsArray: number[] = [];
    for (let i = 0; i <= num; i += 0.5) {
      starsArray.push(i + 0.5);
    }
   
    return starsArray;
  }
  
  // ngOnChanges(changes: SimpleChanges): void{
  //   if(changes['book_id'].firstChange==false){
  //     this.route
  //     .navigate(['/about_us'], { replaceUrl: false })
  //     .then(() => this.route.navigate(['/details', this.book_id]));

  //   }
    
  // }
  countplus() {
    this.count.update((num) => num + 1);
  }

  countmin(){
    if(this.count()>0)
    { this.count.update(num=>num-1)}
   
      }
  
  Writereview(){
    this.route
        .navigate(['/'], { replaceUrl: false })
        .then(() => this.route.navigate(['/review', this.book_id]));
  
}

addtofav(book:Book_module){

  this.fav.getAllFromFav().subscribe(
    res=>{
     let flag=true;
     for(let y of res)
     {
       if(y.book_id==this.book_id)
     {
      alert('this item already add to fav')
      flag=false;
     break;
   
     }
     }
    if(flag){
     this.fav.addToFav(book,this.book_id)
    } 
    } 
   );}

addtocart(book:Book_module){
this.cart.getAllFromCart().subscribe(
 res=>{
  let flag=true;
  for(let y of res)
  {
    if(y.book_id==this.book_id)
  {
   alert('this item already add to cart')
   flag=false;
  break;

  }

  }
 if(flag){
  this.cart.addToCart(book,this.book_id)
 } 
 } 
);}

}