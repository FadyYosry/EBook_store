import { Component, Input, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { Observable } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { Firestore } from '@angular/fire/firestore';
import { Cart_Book_module } from '../../modules/cartBook.module';

@Component({
  selector: 'app-book-details-component',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './book-details-component.component.html',
  styleUrl: './book-details-component.component.css',
})
export class BookDetailsComponentComponent implements OnInit {
  count = signal(0);
  countplus() {
    this.count.update((num) => num + 1);
  }
<<<<<<< HEAD
  countmin(){
    if(this.count()>0)
    { this.count.update(num=>num-1)}
   
      }
  tocart:boolean=true;
  tofav:boolean=true;
  book_id='SGMOuEWjVAkr905lOYgw';
book$!:Observable<Book_module>;
constructor(private fire_store:Firestore,private bookurl:ActivatedRoute,private serve:AllBooksService,private cart:CartService,private fav:FavService){
 this. tocart=true;
  this.tofav=true;
// this.book_id=bookurl.snapshot.params['id'];
=======
  countmin() {
    if (this.count() > 0) {
      this.count.update((num) => num - 1);
    }
  }
  tocart: boolean = true;
  tofav: boolean = true;
  book_id = '';
  thebook: any;
  book$!: Observable<Book_module>;
  constructor(
    private fire_store: Firestore,
    private bookurl: ActivatedRoute,
    private serve: AllBooksService,
    private cart: CartService,
    private fav: FavService,
    private route: Router
  ) {
    this.tocart = true;
    this.tofav = true;
    // console.log(this.bookurl.snapshot.params['id']);
    // this.book_id=bookurl.snapshot.params['id'];
    this.serve
      .getOneBook(this.bookurl.snapshot.params['id'])
      .subscribe((res) => {
        console.log(this.bookurl.snapshot.params['id']);
        this.thebook = res;
        // console.log(this.thebook);
        // this.route
        //   .navigate(['/details'], { replaceUrl: false })
        //   .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
        // this.route
        // .navigate(['/'], { replaceUrl: false })
        // .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
       
      });
>>>>>>> 0bbe52d2f9d5f2a0b6c1d98f9f71d82b1358d849

  }
  routing(){
    this.route
        .navigate(['/'], { replaceUrl: false })
        .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
  }
  ngOnInit(): void {
    this.book$ = this.serve.getOneBook('SGMOuEWjVAkr905lOYgw');
  }

<<<<<<< HEAD
addtofav(book:Book_module){
this.fav.addToFav(book)
}
addtocart(book:Book_module){
// this.cart.getAllFromCart().subscribe(
//  res=>{
//   for(let y of res)
//   {
//     if(y.book_id==this.book_id)
//   {
//     this.tocart=false;
//   break;

//   }
//   }
  
//  } 
// );



=======
  addtofav(book: Book_module) {
    this.fav.addToFav(book);
  }
  addtocart(book: Book_module) {
    if (this.tocart) {
      this.cart.addToCart(book);
      this.tocart = false;
    } else {
      alert('it ia already add ');
    }
  }
>>>>>>> 0bbe52d2f9d5f2a0b6c1d98f9f71d82b1358d849
}
