import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import{ initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { routes } from './app.routes';
import { firebaseConfig } from '../firebase.config';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(()=>getFirestore())
    )]
};
