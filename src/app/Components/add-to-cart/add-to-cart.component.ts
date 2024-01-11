import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Book {
  title: string;
  price: number;
  image: string;
  quantity: number;
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
    { title: 'Book 1', price: 10, image: 'url_to_image_1', quantity: 1 },
    { title: 'Book 2', price: 15, image: 'url_to_image_2', quantity: 2 },
    { title: 'Book 3', price: 20, image: 'url_to_image_3', quantity: 3 },
    { title: 'Book 4', price: 25, image: 'url_to_image_4', quantity: 4 },
  ];

  addToCart(book: Book): void {
    const existingBook = this.cartItems.find(
      (item) => item.title === book.title
    );

    if (existingBook) {
      existingBook.quantity++;
    } else {
      this.cartItems.push({ ...book, quantity: 1 });
    }
  }

  removeFromCart(book: Book): void {
    const existingBook = this.cartItems.find(
      (item) => item.title === book.title
    );

    if (existingBook) {
      if (existingBook.quantity > 1) {
        existingBook.quantity--;
      } else {
        this.removeItem(book);
      }
    }
  }

  removeItem(book: Book): void {
    this.cartItems = this.cartItems.filter((item) => item.title !== book.title);
  }

  buy() {}
}
