import { Component } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { HttpClientModule } from '@angular/common/http';
import { OneAuthorComponent } from '../one-author/one-author.component';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { CardsSecComponent } from '../cards-sec/cards-sec.component';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [HttpClientModule,OneAuthorComponent,CommonModule,CardsSecComponent],
  providers: [AllBooksService],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  constructor(private allbooks:AllBooksService,
     private ViewportScroller:ViewportScroller){
    this.ViewportScroller.scrollToPosition([0, 0]);
  }
  all_book:any[] = [];

  flag:string="active"
  count :number=0;
  ngOnInit(): void {

    this.allbooks.getAllFromAllBooks().subscribe((res: any) => {
      // this.all_book = res;
      // console.log(this.all_book);
      for (let i = 0; i < 12; i++) {
        this.all_book.push( res[i]);
      }
     
    });
     
  }

}


