import { Curso } from './../curso.model';
import { Component, OnInit } from '@angular/core';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-ler-curso',
  templateUrl: './ler-curso.component.html',
  styleUrls: ['./ler-curso.component.css']
})
export class LerCursoComponent implements OnInit {

  cursos: Curso[];
  displayedColumns: string[] = ['descricao', 'categoria', 'inicio', 'termino', 'acao'];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos(): void {
    this.cursoService.retornarCursos().subscribe(
      dados => {
        this.cursos = dados;
      }
    );
  }

}
