import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { CursosComponent } from './views/cursos/cursos.component';
import { CriarCursoComponent } from './components/curso/criar-curso/criar-curso.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "cursos", component: CursosComponent},
  {path: "cursos/criar", component: CriarCursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
