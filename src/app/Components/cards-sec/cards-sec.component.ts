import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-cards-sec',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [DemoService],
  templateUrl: './cards-sec.component.html',
  styleUrl: './cards-sec.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsSecComponent implements AfterViewInit {
  
  proggramingBooks: any = {};

  constructor(private client: DemoService) {
    this.getProducts();
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
  
  getProducts() {
    this.client.getProgramming().subscribe(
      (proggraming) => {
        console.log(proggraming)
        this.proggramingBooks = proggraming;
        console.log(this.proggramingBooks[3]['volumeInfo']['title']);
        console.log(this.proggramingBooks[3]['volumeInfo']['publisher']);
        console.log(this.proggramingBooks[3]['saleInfo']['price']);
        console.log(this.proggramingBooks[3]['volumeInfo']['imageLinks']['thumbnail']); 
      }
      );
  }

  @ViewChild('swiperEx') swiperEx?: ElementRef;

  ngAfterViewInit(): void {
    register();
  }
}
