import { CategoriaCurso } from './categoria-curso.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private urlBase: string = "http://localhost:8080/api/curso";
  private urlCursos: string = "http://localhost:8080/api/curso/all";
  private urlCategorias: string = "http://localhost:8080/api/categoria/all";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'X',
    {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  criarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.urlBase, curso);
  }

  retornarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlCursos);
  }

  retornarCategoriasCursos(): Observable<CategoriaCurso[]> {
    return this.http.get<CategoriaCurso[]>(this.urlCategorias);
  }

  lerPorId(id: number): Observable<Curso> {
    const url = `${this.urlBase}/${id}`;
    return this.http.get<Curso>(url);
  }

  atualizarCurso(curso: Curso): Observable<Curso> {
    const url = `${this.urlBase}/${curso.id}`;
    return this.http.patch<Curso>(url, curso);
  }
}

