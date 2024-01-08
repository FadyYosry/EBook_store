import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
import { Book_module } from '../../modules/book.module';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private fire_store:Firestore ) { }

  private collection=collection(this.fire_store,'favourites')
   getAllFromFav(){
    return collectionData(this.collection,{idField:'id'}) as Observable<Book_module[]>
   }
  
   addToFav(book:Book_module){
  return of( addDoc(this.collection,book));
   }
  
  deleteProductFromFav(id: string){
    const ref = doc(this.fire_store,'favourites',id);
    console.log(ref)
    deleteDoc(ref)
  }
}
