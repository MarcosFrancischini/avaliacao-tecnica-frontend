import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Cursos',
      icon: 'storefront',
      routeUrl: '/cursos'
    };
  }

  ngOnInit(): void {
  }

  irParaCriacaoCursos(): void {
    this.router.navigate(['/cursos/criar']);
  }

}
