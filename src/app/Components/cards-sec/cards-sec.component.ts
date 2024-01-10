import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { outputAst } from '@angular/compiler';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards-sec',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  providers: [DemoService, AllBooksService],
  templateUrl: './cards-sec.component.html',
  styleUrl: './cards-sec.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsSecComponent implements AfterViewInit {
  computerBooks: any[] = [];
  psychologyBooks: any[] = [];
  scienceBooks: any[] = [];
  YoungAdultFiction: any[] = [];
  @Output() book = new EventEmitter();

  constructor(
    private client: DemoService,
    private allbooks: AllBooksService,
    private route: Router,
    private bookurl: ActivatedRoute,
  ) {
    allbooks.getAllFromAllBooks().subscribe((res: any) => {
      // Define the type of 'res' as 'Book_module[]'
      for (let i = 0; i < res.length; i++) {
        if (res[i]['categories'] == 'Computers') {
          this.computerBooks.push(res[i]);
        } else if (res[i]['categories'] == 'Psychology') {
          this.psychologyBooks.push(res[i]);
        } else if (res[i]['categories'] == 'science') {
          this.scienceBooks.push(res[i]);
        } else if (res[i]['categories'] == 'Young Adult Fiction') {
          this.YoungAdultFiction.push(res[i]);
        }
        // console.log(res[i]['categories']);
      }
      // console.log(this.computerBooks);
    });
  }

  routing(){
    console.log(this.bookurl.snapshot.params['id']);
    this.route
        .navigate(['/'], { replaceUrl: false })
        .then(() => this.route.navigate(['/details', this.bookurl.snapshot.params['id']]));
  }
  fav(e: Event) {
    const element = e.target as HTMLElement;
    if (element) {
      if (element.style.color != 'white' && element.style.color) {
        element.style.color = 'white';
      } else {
        element.style.color = '#5c4e79';
      }
    } else {
      console.log('Element not found');
    }
  }

  @ViewChild('swiperEx') swiperEx?: ElementRef;

  ngAfterViewInit(): void {
    register();
  }
}
