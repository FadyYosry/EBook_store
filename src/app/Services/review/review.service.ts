import { Injectable } from '@angular/core';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import {  of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private fire_store:Firestore ) { }

  private collection:any;
   getAllReviews(id:string)
   {
    this.collection=collection(this.fire_store,'allbooks/'+id+'/review')
    return collectionData(this.collection,{idField:'id'})
   }
  
   addReview(id:string,myreview:string){
    this.collection=collection(this.fire_store,'allbooks/'+id+'/review')
  return of( addDoc(this.collection,myreview));
   }
  
  deleteReview(id: string){
    const ref = doc(this.fire_store,'allbooks/'+id+'/review',id);
    console.log(ref)
    deleteDoc(ref)
  }
}
