import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
import { Book_module } from '../../modules/book.module';
import { Cart_Book_module } from '../../modules/cartBook.module';
@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private fire_store:Firestore ) { }

private collection=collection(this.fire_store,'cart')
 getAllFromCart(){
  return collectionData(this.collection,{idField:'id'}) as Observable<Book_module[]>
 }

 addToCart(book:Book_module){
  let mybook={
    "numOfBookNeed":0,
    "title":book.title ,
    "authors": book.authors,
    "publisher": book.publisher,
    "publishedDate": book.publishedDate,
    "description":book.description,
    "categories": book.categories,
    "averageRating": book.averageRating,
    "contentVersion":book.contentVersion,
      "imagesmallThumbnail":book.imagesmallThumbnail,
      "imagethumbnail": book.imagethumbnail ,
    "language": book.language,
    "country": book.country,
    "price": book.price
  }
return of( addDoc(this.collection,mybook));
 }

deleteBookFromCart(id: string){
  const ref = doc(this.fire_store,'cart',id);
  console.log(ref)
  deleteDoc(ref)
}
updateBookInToCart(book:Cart_Book_module,id: string){
  const ref = doc(this.fire_store,'cart',id);
 updateDoc(ref,{...book})
}
}
