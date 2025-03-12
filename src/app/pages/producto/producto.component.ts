import { Component } from '@angular/core';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  //Propiedades 
  productos: any;
  producto = new Producto();

  //Constructor
  constructor(private productoService: ProductoService) { 
    this.getProductos();
  }

  //metodo que hace la peticion para obtener los productos
  async getProductos(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  //metodo para agregar un producto
  insertarProducto() {
    this.productoService.agregarProducto(this.producto);
    this.getProductos();
    this.producto = new Producto();
  }

  //metodo para seleccionar un producto de la tabla
  selectProducto(productoSeleccionado:Producto){
    this.producto = productoSeleccionado;
  }

  //metodo para modificar un producto
  updateProducto(){
    this.productoService.modificarProducto(this.producto);
    this.producto = new Producto();
    this.getProductos();
  }

  //metodo para eliminar un producto seleccionado
  deleteProducto(){
    this.productoService.borrarProducto(this.producto);
    this.producto = new Producto;
    this.getProductos();
  }

  //metodo para limpiar el formulario
  clearForm(){
    this.producto = new Producto();
  }

}
