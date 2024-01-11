import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  reviewComment: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  savedReviews: { comment: string; rating: number }[] = [];
  errorMessage: string = '';

  setRating(star: number): void {
    this.selectedRating = star;
  }

  submitReview(): void {
    if (this.reviewComment && this.selectedRating > 0) {
      this.savedReviews.push({
        comment: this.reviewComment,
        rating: this.selectedRating,
      });

      this.reviewComment = '';
      this.selectedRating = 0;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter both a comment and a rating.';
    }
  }

  isStarActive(star: number): boolean {
    return star <= this.selectedRating;
  }

  generateStarsArray(rating: number): number[] {
    return Array(rating)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
