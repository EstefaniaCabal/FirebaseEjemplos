import { Producto } from '../models/producto';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  // Método para obtener todos los productos
  getProductos() {     
    const productosCollection = collection(this.db, 'productos');
    return collectionData(productosCollection, { idField: 'id' }).pipe(first());
  }

  // Método para agregar un documento a la colección productos
  agregarProducto(producto: Producto) {
    if (!producto.descripcion || !producto.descripcion) {
      alert("Todos los campos son obligatorios. Por favor, completa la información.");
      return;
    }
  
    const productosCollection = collection(this.db, 'productos');
    const productoData = { 
      descripcion: producto.descripcion,
      precio: producto.precio,
    };
  
    return addDoc(productosCollection, productoData)
      .then(() => alert("Producto agregado correctamente"))
      .catch(error => alert("Error al agregar el producto: " + error.message));
  }

  //metodo para modificar un producto
  modificarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    updateDoc(documentRef, {
      descripcion: producto.descripcion,
      precio: producto.precio,
    });
  }

  //metodo para borar un producto
  borrarProducto(producto: Producto) {
    const documentRef = doc(this.db, 'productos', producto.id);
    deleteDoc(documentRef);
    alert("Registro eliminado correctamente");
  }

}
