import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, CardModule, ToastModule, DialogModule, InputTextModule, DropdownModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayDialog = false;
  displayDeleteDialog = false;
  productForm: FormGroup;
  selectedProduct: Product | null = null;
  isEditMode = false;

  statusOptions = [
    { label: '在售', value: '在售' },
    { label: '缺货', value: '缺货' },
    { label: '下架', value: '下架' }
  ];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      status: ['在售', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.selectedProduct = null;
    this.productForm.reset({ status: '在售' });
    this.displayDialog = true;
  }

  openEditDialog(product: Product): void {
    this.isEditMode = true;
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.displayDialog = true;
  }

  openDeleteDialog(product: Product): void {
    this.selectedProduct = product;
    this.displayDeleteDialog = true;
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.isEditMode && this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct.id, this.productForm.value).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: '成功', detail: '商品更新成功' });
        this.loadProducts();
        this.displayDialog = false;
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: '成功', detail: '商品添加成功' });
        this.loadProducts();
        this.displayDialog = false;
      });
    }
  }

  deleteProduct(): void {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe(success => {
        if (success) {
          this.messageService.add({ severity: 'success', summary: '成功', detail: '商品删除成功' });
          this.loadProducts();
        } else {
          this.messageService.add({ severity: 'error', summary: '失败', detail: '商品删除失败' });
        }
        this.displayDeleteDialog = false;
      });
    }
  }
}
