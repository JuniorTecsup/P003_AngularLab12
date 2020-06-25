import { Component, OnInit } from '@angular/core';
import { ArticulosService } from './services/articulos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Lab11CRUD';
  lista = null
  uploadedFiles: Array < File > ;
  prod: any = {
    _id: null,
    nombre: null,
    precio: null,
    tipo: null,
    descripcion: null,
    distribuidora: null,
    NombreArchivo: null,
    RutaArchivo: null
  }

//CONSTRUCTOR//
constructor(private service: ArticulosService) { }

  ngOnInit(): void {
    this.recuperarTodos()
  }

  fileChange(element) { 
    console.log('fileChangexx');   
    this.uploadedFiles = element.target.files;  
  }

  upload() {    
  let formData = new FormData();    
  for (var i = 0; i < this.uploadedFiles.length; i++) {      
  
  formData.append("file",
  this.uploadedFiles[i],
  this.uploadedFiles[i].name);  
  }

  formData.append('nombre', this.prod.nombre);
  formData.append('precio', this.prod.precio);
  formData.append('tipo', this.prod.tipo);
  formData.append('descripcion', this.prod.descripcion);
  formData.append('distribuidora', this.prod.distribuidora);

    this.service.upload(formData).subscribe((res)=> {        
      console.log('response received is ', res);
      this.limpiar();
      this.recuperarTodos();  
    });
  }

  recuperarTodos() {
    this.service.listar().subscribe((data) => {
      this.lista = data
    });
  }

///Agregar
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
