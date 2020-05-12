import { CategoriaCurso } from './../categoria-curso.model';
import { Component, OnInit } from '@angular/core';
import { CursoService } from './../curso.service';
import { Router } from '@angular/router';
import { Curso } from '../curso.model';

@Component({
  selector: 'app-criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css']
})
export class CriarCursoComponent implements OnInit {

  curso: Curso = {
    descricao: '',
    categoria: null,
    dataInicio: null,
    dataTermino: null
  };

  categorias: CategoriaCurso[];

  constructor(private cursoService: CursoService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarCategoriasCursos();
  }

  listarCategoriasCursos(): void {
    this.cursoService.retornarCategoriasCursos().subscribe(
      dados => {
        this.categorias = dados;
      }
    );
  }

  criarCurso(): void {
    this.cursoService.criarCurso(this.curso).subscribe(() => {
      this.cursoService.mostrarMensagem('Curso criado com sucesso!');
      this.router.navigate(['/cursos']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
