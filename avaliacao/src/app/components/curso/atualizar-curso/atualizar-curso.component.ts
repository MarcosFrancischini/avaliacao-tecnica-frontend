import { Component, OnInit } from '@angular/core';
import { Curso } from './../curso.model';
import { CategoriaCurso } from './../categoria-curso.model';
import { CursoService } from './../curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-atualizar-curso',
  templateUrl: './atualizar-curso.component.html',
  styleUrls: ['./atualizar-curso.component.css']
})
export class AtualizarCursoComponent implements OnInit {

  curso: Curso;

  categorias: CategoriaCurso[];

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pegarDadosCurso();
    this.listarCategoriasCursos();
  }

  pegarDadosCurso(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.cursoService.lerPorId(id).subscribe(
      dados => {
        this.curso = dados;
        this.curso.dataInicio = this.formatarData(this.curso.dataInicio);
        this.curso.dataTermino =  this.formatarData(this.curso.dataTermino);
      }
    );
  }

  listarCategoriasCursos(): void {
    this.cursoService.retornarCategoriasCursos().subscribe(
      dados => {
        this.categorias = dados;
      }
    );
  }

  compararCategorias(o1: CategoriaCurso, o2: CategoriaCurso): boolean {
    return o1.id === o2.id;
  }

  private formatarData(data: Date): Date {
    let tempData: string = formatDate(data, 'MM-dd-yyyy', 'pt-BR');
    let dataFormatada = new Date(tempData);
    return dataFormatada;
  }

  atualizarCurso(): void {
    this.cursoService.atualizarCurso(this.curso).subscribe(() => {
      this.cursoService.mostrarMensagem('Curso atualizado com sucesso!');
      this.router.navigate(['/cursos']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
