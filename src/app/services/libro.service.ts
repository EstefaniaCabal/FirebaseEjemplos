import { Injectable, inject } from '@angular/core';
import { Libro } from '../models/libro.model';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  // Método para obtener todos los libros
  getLibros() {     
    const librosCollection = collection(this.db, 'libros');
    return collectionData(librosCollection, { idField: 'id' }).pipe(first());
  }

  // Método para agregar un documento a la colección libros
  agregarLibro(libro: Libro) {
    if (!libro.titulo || !libro.autor || !libro.editorial || !libro.anioPublicacion) {
      alert("Todos los campos son obligatorios. Por favor, completa la información.");
      return;
    }
  
    const librosCollection = collection(this.db, 'libros');
    const libroData = { 
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion 
    };
  
    return addDoc(librosCollection, libroData)
      .then(() => alert("Libro agregado correctamente"))
      .catch(error => alert("Error al agregar el libro: " + error.message));
  }

  //metodo para modificar un libro
  modificarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anioPublicacion: libro.anioPublicacion
    });
  }

  //metodo para borar un libro
  borrarLibro(libro: Libro) {
    const documentRef = doc(this.db, 'libros', libro.id);
    deleteDoc(documentRef);
    alert("Registro eliminado correctamente");
  }

}
