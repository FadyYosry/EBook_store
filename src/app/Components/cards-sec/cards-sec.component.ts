import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-sec',
  standalone: true,
  imports: [],
  templateUrl: './cards-sec.component.html',
  styleUrl: './cards-sec.component.css'
})
export class CardsSecComponent {
  private isRed: boolean = false;

  fav() {
    const element = document.getElementById('heart');
    if (element !== null) {
      if (this.isRed) {
        element.style.color = 'white';
        this.isRed = false;
      } else {
        element.style.color = '#5c4e79';
        this.isRed = true;
      }
    } else {
      console.log('Element not found');
    }
  }
}
