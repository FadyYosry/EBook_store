import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { Fav_Book_module } from '../../modules/favBook.module';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private fire_store:Firestore ) { }

  private collection=collection(this.fire_store,'favourites')
   getAllFromFav(){
    return collectionData(this.collection,{idField:'id'}) as Observable<Fav_Book_module[]>
   }
  
   addToFav(book:Book_module,bookid:String){
    let mybook={
      "book_id":bookid,
      "title":book.title||null ,
      "discount":book.discount||0,
      "authors": book.authors||null ,
      "publisher": book.publisher||null ,
      "publishedDate": book.publishedDate||null ,
      "description":book.description||null ,
      "categories": book.categories||null ,
      "averageRating": book.averageRating||null ,
      "contentVersion":book.contentVersion||null ,
        "imagesmallThumbnail":book.imagesmallThumbnail,
        "imagethumbnail": book.imagethumbnail ,
      "language": book.language||null ,
      "country": book.country||null ,
      "price": book.price||null 
    }
  return of( addDoc(this.collection,mybook));
   }
  
  deleteProductFromFav(id: string){
    const ref = doc(this.fire_store,'favourites',id);
    console.log(ref)
    deleteDoc(ref)
  }
}
