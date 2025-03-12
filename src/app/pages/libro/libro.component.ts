import { Component } from '@angular/core';

import { Libro } from '../../models/libro.model';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-libro',
    standalone: true, 
    imports: [FormsModule],
    templateUrl: './libro.component.html',
    styleUrl: './libro.component.css'
})
export class LibroComponent {


  //Propiedades 
  libros: any;
  libro = new Libro();

  //Constructor
  constructor(private libroService: LibroService) { 
    this.getLibros();
  }

  //metodo que hace la peticion para obtener los libros
  async getLibros(): Promise<void> {
    this.libros = await firstValueFrom(this.libroService.getLibros());
  }

  //metodo para agregar un libro
  insertarLibro() {
    this.libroService.agregarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
  }

  //metodo para seleccionar un libro de la tabla
  selectLibro(libroSeleccionado:Libro){
    this.libro = libroSeleccionado;
  }

  //metodo para modificar un libro
  updateLibro(){
    this.libroService.modificarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
  }

  //metodo para eliminar un libro seleccionado
  deleteLibro(){
    this.libroService.borrarLibro(this.libro);
    this.libro = new Libro;
    this.getLibros();
  }

  //metodo para limpiar el formulario
  clearForm(){
    this.libro = new Libro();
  }

  
}
