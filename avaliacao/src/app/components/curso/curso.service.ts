import { CategoriaCurso } from './categoria-curso.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private urlBase: string = "http://localhost:8080/api/curso";
  private urlCursos: string = "http://localhost:8080/api/curso/all";
  private urlCategorias: string = "http://localhost:8080/api/categoria/all";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  mostrarMensagem(mensagem: string, isError: boolean = false): void {
    this.snackBar.open(mensagem, 'X',
    {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"]
    });
  }

  criarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.urlBase, curso).pipe(
      map((obj) => obj),
      catchError((e) => this.tratarErro(e))
    );
  }

  retornarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlCursos).pipe(
      map((obj) => obj),
      catchError((e) => this.tratarErro(e))
    );
  }

  retornarCategoriasCursos(): Observable<CategoriaCurso[]> {
    return this.http.get<CategoriaCurso[]>(this.urlCategorias);
  }

  lerPorId(id: string): Observable<Curso> {
    const url = `${this.urlBase}/${id}`;
    return this.http.get<Curso>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.tratarErro(e))
    );
  }

  atualizarCurso(curso: Curso): Observable<Curso> {
    const url = `${this.urlBase}/${curso.id}`;
    return this.http.patch<Curso>(url, curso).pipe(
      map((obj) => obj),
      catchError((e) => this.tratarErro(e))
    );
  }

  deletarCurso(id: number): Observable<Curso> {
    const url = `${this.urlBase}/${id}`;
    return this.http.delete<Curso>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.tratarErro(e))
    );
  }

  tratarErro(e: any): Observable<any> {
    let erro: string = "Ocorreu um erro!";

    if(e.status == 406) {
      erro = "Ocorreu um erro ao salvar os dados.";
    }
    if(e.status == 412) {
      erro = "Existe(m) curso(s) planejados(s) dentro do período informado.";
    }

    this.mostrarMensagem(erro, true);
    return EMPTY;
  }
}

