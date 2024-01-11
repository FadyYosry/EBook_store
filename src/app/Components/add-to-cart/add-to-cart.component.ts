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
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css',
})
export class AddToCartComponent {
  cartItems: Book[] = [
    {
      title: 'Book 1',
      price: '10',
      imagesmallThumbnail: 'url_image_1',
      numOfBookNeed: 1,
    },
    {
      title: 'Book 2',
      price: '15',
      imagesmallThumbnail: 'url_image_2',
      numOfBookNeed: 2,
    },
    {
      title: 'Book 3',
      price: '20',
      imagesmallThumbnail: 'url_image_3',
      numOfBookNeed: 3,
    },
    {
      title: 'Book 4',
      price: '25',
      imagesmallThumbnail: 'url_image_4',
      numOfBookNeed: 4,
    },
  ];

  addToCart(book: Book): void {
    const existingBook = this.cartItems.find(
      (item) => item.title === book.title
    );

    if (existingBook) {
      existingBook.numOfBookNeed = (existingBook.numOfBookNeed ?? 0) + 1;
    } else {
      this.cartItems.push({ ...book, numOfBookNeed: 1 });
    }
  }

  removeFromCart(book: Book): void {
    const existingBook = this.cartItems.find(
      (item) => item.title === book.title
    );

    if (existingBook) {
      existingBook.numOfBookNeed = (existingBook.numOfBookNeed ?? 0) - 1;

      if (existingBook.numOfBookNeed <= 0) {
        this.removeItem(book);
      }
    }
  }

  removeItem(book: Book): void {
    this.cartItems = this.cartItems.filter((item) => item.title !== book.title);
  }

  buy() {}
}
