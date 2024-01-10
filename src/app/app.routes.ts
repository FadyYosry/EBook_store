import { Routes } from '@angular/router';
import { BookViewComponent } from './Components/book-view/book-view.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { BookDetailsComponentComponent } from './Components/book-details-component/book-details-component.component';
import { AddToCartComponent } from './Components/add-to-cart/add-to-cart.component';

export const routes: Routes = [
  { path: '', component: BookViewComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'details/:id', component: BookDetailsComponentComponent },
  { path: 'add-to-cart', component: AddToCartComponent },
];
