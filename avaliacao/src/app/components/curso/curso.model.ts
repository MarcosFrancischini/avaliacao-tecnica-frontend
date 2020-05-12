import { CategoriaCurso } from './categoria-curso.model';

export class Curso {
  id?: number;
  descricao: string;
  categoria: CategoriaCurso;
  dataInicio: Date;
  dataTermino: Date;
}
