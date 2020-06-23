import { Component } from '@angular/core';
import { ArticulosService } from './services/articulos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Lab11CRUD';
  lista = null
  prod: any = {
    _id: null,
    nombre: null,
    precio: null,
    tipo: null,
    descripcion: null,
    distribuidora: null
  }


constructor(private service: ArticulosService) { }

  ngOnInit(): void {
    this.recuperarTodos()
  }

  recuperarTodos() {
    this.service.listar().subscribe((data) => {
      this.lista = data
    });
  }

  nuevo() {
    this.service.nuevo(this.prod).subscribe(result => {
        this.limpiar();
        this.recuperarTodos();
      
    });
  }

  eliminar(codigo) {
  	if (!confirm("Esta seguro que desea eliminar este registro?"))
      return;
    this.service.eliminar(codigo).subscribe(result => {
      this.recuperarTodos();
    });
  }

  actualizar() {
    this.service.actualizar(this.prod).subscribe(result => {
      this.limpiar();
      this.recuperarTodos();
    });
  }

  mostrar(codigo){
    this.service.mostrar(codigo).subscribe(result => {
      this.prod = result
    });
  }

  hayRegistros() {
    return true;
  }

  limpiar() {
    this.prod = {
      	_id: null,
    	nombre: null,
    	precio: null,
    	tipo: null,
    	descripcion: null,
    	distribuidora: null
    	};
  }

}
