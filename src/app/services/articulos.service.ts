import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ArticulosService {
  url='http://localhost:3000/productos/'; 
  constructor(private http: HttpClient) { }
  listar() {
    return this.http.get(`${this.url}listar`); 
  }
  //cambiar
  nuevo(articulo) {
    return this.http.post(`${this.url}`, articulo);    
  }
  eliminar (codigo) {
    return this.http.delete(`${this.url}${codigo}`);
  }
  mostrar (codigo) {
    return this.http.get(`${this.url}mostrar/${codigo}`);
  }
  actualizar(articulo) {
    return this.http.put(`${this.url}`, articulo);    
  }
  upload(formData) {    
  let urlAPI = 'http://localhost:3000/productos/uploadFile';//api-->productos    
    return this.http.post(urlAPI, formData); 
  }
}


