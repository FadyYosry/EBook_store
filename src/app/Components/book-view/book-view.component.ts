import { Component } from '@angular/core';
import { DemoService } from '../../Services/demo.service';
import { HttpClientModule } from '@angular/common/http';
import { OneAuthorComponent } from '../one-author/one-author.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [HttpClientModule,OneAuthorComponent,CommonModule],
  providers: [DemoService],
  templateUrl: './book-view.component.html',
  styleUrl: './book-view.component.css'
})
export class BookViewComponent {
  constructor(private myservice:DemoService){}
  all_author:any;
  flag:string="active"
  count :number=0;
  ngOnInit(): void {
console.log(this.all_author)
   this.myservice.getAllauthor().subscribe({
     next:(data)=>{this.all_author=data
      },
     error:(error)=>{console.log(error)},
     complete:()=>{console.log("complete")}

   })
     
  }

}


