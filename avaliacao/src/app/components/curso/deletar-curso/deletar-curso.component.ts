import { CategoriaCurso } from './../categoria-curso.model';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoService } from './../curso.service';
import { Curso } from './../curso.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deletar-curso',
  templateUrl: './deletar-curso.component.html',
  styleUrls: ['./deletar-curso.component.css']
})
export class DeletarCursoComponent implements OnInit {

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

  deletarCurso(): void {
    this.cursoService.deletarCurso(this.curso.id).subscribe(() => {
      this.cursoService.mostrarMensagem('Curso deletado com sucesso!');
      this.router.navigate(['/cursos']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }

}
