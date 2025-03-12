import { Empleado } from '../models/empleado';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private db: Firestore = inject(Firestore);
  constructor() { }

    // Método para obtener todos los empleados
    getEmpleados() {     
      const empleadosCollection = collection(this.db, 'empleados');
      return collectionData(empleadosCollection, { idField: 'id' }).pipe(first());
    }
  
    // Método para agregar un documento a la colección empleados
    agregarEmpleado(empleado: Empleado) {
      if (!empleado.nombre || !empleado.puesto || !empleado.turno) {
        alert("Todos los campos son obligatorios. Por favor, completa la información.");
        return;
      }
    
      const empleadosCollection = collection(this.db, 'empleados');
      const empleadoData = { 
        nombre: empleado.nombre,
        puesto: empleado.puesto,
        turno: empleado.turno 
      };
    
      return addDoc(empleadosCollection, empleadoData)
        .then(() => alert("Empleado agregado correctamente"))
        .catch(error => alert("Error al agregar el empleado: " + error.message));
    }
  
    //metodo para modificar un empleado
    modificarEmpleado(empleado: Empleado) {
      const documentRef = doc(this.db, 'empleados', empleado.id);
      updateDoc(documentRef, {
        nombre: empleado.nombre,
        puesto: empleado.puesto,
        turno: empleado.turno
      });
    }
  
    //metodo para borar un empleado
    borrarEmpleado(empleado: Empleado) {
      const documentRef = doc(this.db, 'empleados', empleado.id);
      deleteDoc(documentRef);
      alert("Registro eliminado correctamente");
    }
}
