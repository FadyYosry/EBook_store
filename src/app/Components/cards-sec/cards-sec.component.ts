import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../../Services/demo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-sec',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [DemoService],
  templateUrl: './cards-sec.component.html',
  styleUrl: './cards-sec.component.css',
})
export class CardsSecComponent {
  counter = 0;
  imgSrc = `../../../assets/Images/`;
  cardTitle = '';
  cardText = '';
  cardPrice = '';
  products: any = {};
  start = 0;
  end = 4;
  fourProducts: [] = [];
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
  nextItem() {
    if (this.start == 0) {
      this.start = 4;
      this.end = 8;
      this.fourProducts = this.products.slice(this.start, this.end);
      // console.log(this.fourProducts);
    }else{
      this.start = 0;
      this.end = 4;
      this.fourProducts = this.products.slice(this.start, this.end);
      // console.log(this.fourProducts);

    }

    // this.counter++;
  }
  getProducts() {
    this.client.getProducts().subscribe((data) => {
      this.products = data;
      // this.changData(this.counter);
      this.fourProducts = this.products.slice(this.start, this.end);
      console.log(this.fourProducts);
    });
  }
  changData(c: any) {
    this.cardTitle = this.products[c]['title'];
    this.cardText = this.products[c]['description'];
    this.cardPrice = this.products[c]['price'];
    this.imgSrc = `../../../assets/Images/${this.products[c]['img']}`;
  }
}
