import { Component } from '@angular/core';

import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  //Propiedades 
  empleados: any;
  empleado = new Empleado();

  //Constructor
  constructor(private empleadoService: EmpleadoService) { 
    this.getEmpleados();
  }

  //metodo que hace la peticion para obtener los empleados
  async getEmpleados(): Promise<void> {
    this.empleados = await firstValueFrom(this.empleadoService.getEmpleados());
  }

  //metodo para agregar un empleado
  insertarEmpleado() {
    this.empleadoService.agregarEmpleado(this.empleado);
    this.getEmpleados();
    this.empleado = new Empleado();
  }

  //metodo para seleccionar un empleado de la tabla
  selectEmpleado(empleadoSeleccionado: Empleado) {
    this.empleado = empleadoSeleccionado;
  }

  //metodo para modificar un empleado
  updateEmpleado() {
    this.empleadoService.modificarEmpleado(this.empleado);
    this.empleado = new Empleado();
    this.getEmpleados();
  }

  //metodo para eliminar un empleado seleccionado
  deleteEmpleado() {
    this.empleadoService.borrarEmpleado(this.empleado);
    this.empleado = new Empleado();
    this.getEmpleados();
  }

  //metodo para limpiar el formulario
  clearForm() {
    this.empleado = new Empleado();
  }

}