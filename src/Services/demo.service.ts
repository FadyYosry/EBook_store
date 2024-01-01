import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  URL = 'http://localhost:3000/products';
  constructor(private client:HttpClient) { }
  getProducts() {
    return this.client.get(this.URL)
  }
}
