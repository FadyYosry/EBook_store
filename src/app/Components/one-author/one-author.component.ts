import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-one-author',
  standalone: true,
  imports: [],
  templateUrl: './one-author.component.html',
  styleUrl: './one-author.component.css'
})
export class OneAuthorComponent {
  @Input() dataofauthor:any;
}
