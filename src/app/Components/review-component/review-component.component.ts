import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../Services/review/review.service';
import { AuthService } from '../../Services/auth/auth.service';
import { UserinfoService } from '../../Services/user/userinfo.service';

@Component({
  selector: 'app-review-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-component.component.html',
  styleUrl: './review-component.component.css',
})
export class ReviewComponentComponent {
  book_id = '';
  allreview: any[] = [];
  logIn: boolean = false;
  constructor(
    bookurl: ActivatedRoute,
    private review: ReviewService,
    private ViewportScroller: ViewportScroller,
    private fire_auth: AuthService,
    private getuserinfo:UserinfoService
  ) {
    this.book_id = bookurl.snapshot.params['id'];
    this.ViewportScroller.scrollToPosition([0, 0]);
  }

  ngOnInit(): void {
    this.fire_auth.getUser().subscribe((user) => {
      this.logIn = false;
      if (user?.uid) {
        this.logIn = true;
      }
    });
    this.review.getAllReviews(this.book_id).subscribe((res) => {
      this.allreview = [];
      for (let i = 0; i < res.length; i++) {
        this.allreview.push(res[i]);
      }
    });
  }
  reviewComment: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number = 0;
  savedReviews: { comment: string; rating: number }[] = [];
  errorMessage: string = '';
  reviewerfName: string = '';
  reviewerlName: string = '';

  setRating(star: number): void {
    this.selectedRating = star;
  }
  
  submitReview(): void {
    if (this.logIn) {
      this.fire_auth.getUser().subscribe((user) => {
        this.getuserinfo.getuser(user?.uid).subscribe(
         userdata=>{ this.reviewerfName = userdata.firstname;
          this.reviewerlName = userdata.lastname;}
        );
        
    
      });
      if (this.reviewComment && this.selectedRating > 0) {
        let myreview = {
          fname:this.reviewerfName,
          lname:this.reviewerlName,
          comment: this.reviewComment,
          rating: this.selectedRating,
        };
        this.review.addReview(this.book_id, myreview);
        this.reviewComment = '';
        this.selectedRating = 0;
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Please enter both a comment and a rating.';
      }
    } else {
      alert('Please login to review');
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
