import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { Observable } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { Firestore } from '@angular/fire/firestore';
import { CardsSecComponent } from '../cards-sec/cards-sec.component';

@Component({
  selector: 'app-book-details-component',
  standalone: true,
  imports: [AsyncPipe,CommonModule,CardsSecComponent],
  templateUrl: './book-details-component.component.html',
  styleUrl: './book-details-component.component.css',
})
export class BookDetailsComponentComponent implements OnInit {
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
  countmin() {
    if (this.count() > 0) {
      this.count.update((num) => num - 1);
    }
  }
  tocart: boolean = true;
  tofav: boolean = true;
  @Input() book_id = '';
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
    

  }
  routing(){
    this.route
        .navigate(['/'], { replaceUrl: false })
        .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
  }
  
  ngOnInit(): void {
    // this.book$ = this.serve.getOneBook('SGMOuEWjVAkr905lOYgw');
   

    this.book_id=this.bookurl.snapshot.params['id'];
     this.book$ = this.serve.getOneBook(this.book_id);
     this.bookurl.paramMap.subscribe((params) => {
      const newBookId = params.get('id');
      
      if (newBookId !== this.book_id) {
        // The 'id' parameter has changed
        this.book_id = newBookId || '';
        console.log("done")
        this.route
        .navigate(['/about_us'], { replaceUrl: false })
        .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
      }
    });
  
    this.serve
      .getOneBook(this.bookurl.snapshot.params['id'])
      .subscribe((res) => {
        this.thebook = res;
        this.counter=res.averageRating;
         
        // this.route
        //   .navigate(['/details'], { replaceUrl: false })
        //   .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
        // this.route
        // .navigate(['/'], { replaceUrl: false })
        // .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
       
      });
  }

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
}
