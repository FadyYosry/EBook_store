import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BookDetailsComponentComponent } from './Components/book-details-component/book-details-component.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CardsSecComponent } from './Components/cards-sec/cards-sec.component';
import { BookViewComponent } from './Components/book-view/book-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ,BookDetailsComponentComponent , HeaderComponent , FooterComponent,AboutUsComponent,CardsSecComponent,BookViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EBook_Store';
}
