import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro', category: '手机', price: 8999, stock: 150, status: '在售', createdAt: '2024-01-15' },
    { id: 2, name: 'MacBook Pro 14', category: '电脑', price: 14999, stock: 80, status: '在售', createdAt: '2024-02-20' },
    { id: 3, name: 'AirPods Pro 2', category: '配件', price: 1899, stock: 320, status: '在售', createdAt: '2024-03-10' },
    { id: 4, name: 'iPad Air', category: '平板', price: 5999, stock: 200, status: '在售', createdAt: '2024-01-25' },
    { id: 5, name: 'Apple Watch Ultra', category: '穿戴', price: 6299, stock: 60, status: '缺货', createdAt: '2024-04-05' },
    { id: 6, name: 'Mac Mini', category: '电脑', price: 6499, stock: 120, status: '在售', createdAt: '2024-02-18' },
    { id: 7, name: 'HomePod mini', category: '配件', price: 749, stock: 450, status: '在售', createdAt: '2024-03-22' },
    { id: 8, name: 'iPhone 15', category: '手机', price: 6499, stock: 280, status: '在售', createdAt: '2024-01-15' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product | undefined> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return of(this.products[index]);
    }
    return of(undefined);
  }

  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
