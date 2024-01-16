import { Injectable, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public myuser:string="notfound";
  constructor( private fire_auth:Auth,private fire_store:Firestore) { }
  ngOnInit(): void {
    user(this.fire_auth).subscribe(myuser=>{
     this.myuser=myuser?.uid||"notfound"
      console.log(myuser?.uid||"notfound")
    })
  }

login(email:string,password:string){
  signInWithEmailAndPassword(this.fire_auth,email,password).then(val=>{
    console.log(val.user.uid)
  }).catch(()=>console.log("error"));
}

  signUp(email:string,password:string,fname:string,lname:string ){
        createUserWithEmailAndPassword(this.fire_auth,email,password).then(val=>{
      setDoc(doc(this.fire_store,'users',val.user.uid),
      {firstname:fname,lastname:lname,email:email,uid:val.user.uid})
      console.log(val.user.uid)}).catch(()=>console.log("error"));
  }
logout(){
  signOut(this.fire_auth);
}

}
