import { ApplicationModule, Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AllBooksService } from '../../Services/all_books/allBooks.service';
import { CartService } from '../../Services/cart/cart.service';
import { FavService } from '../../Services/fav/fav.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule , CommonModule , FormsModule , ApplicationModule  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  allbooks:any
  filterdbooks1:any
  searchTerm:any
  constructor(private fire_store:Firestore,private bookurl:ActivatedRoute,private serve:AllBooksService,private cart:CartService,private fav:FavService){
}

ngOnInit(): void {
  this.serve.getAllFromAllBooks().subscribe(data =>{this.allbooks=data})
}

fire(){
 
}
remove(){
  this.filterdbooks1=[];
}
sendData1(event :any){
  this.filterdbooks1=[];

       this.searchTerm=event.target.value;
       for (let book of this.allbooks){
        if (this.searchTerm.trim()==book.title){
          this.filterdbooks1.push(book.title)
        }
        for(let i=0 ; i<=book.title.length ; i++){
         
          if (this.searchTerm.trim()==book.title.slice(0,i+1).toLowerCase()||this.searchTerm.trim()==book.title.slice(0,i+1).toUpperCase()){
          this.filterdbooks1.push(book)
          }
          
        }
   
  
    }


}

}
