import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Book {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  categories?: string;
  averageRating?: number;
  contentVersion?: string;
  imagesmallThumbnail?: string;
  imagethumbnail?: string;
  language?: string;
  country?: string;
  price?: string;
  numOfBookNeed?: number;
}
@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css',
})
export class FavComponent {
  cartItems: Book[] = [
    {
      title: 'Book 1',
      price: '10',
      imagesmallThumbnail: 'url_to_image_1',
      numOfBookNeed: 1,
    },
    {
      title: 'Book 2',
      price: '15',
      imagesmallThumbnail: 'url_to_image_2',
      numOfBookNeed: 2,
    },
    {
      title: 'Book 3',
      price: '20',
      imagesmallThumbnail: 'url_to_image_3',
      numOfBookNeed: 3,
    },
    {
      title: 'Book 4',
      price: '25',
      imagesmallThumbnail: 'url_to_image_4',
      numOfBookNeed: 4,
    },
  ];

  removeItem(book: Book): void {
    this.cartItems = this.cartItems.filter((item) => item.title !== book.title);
  }

  buy() {}
}
