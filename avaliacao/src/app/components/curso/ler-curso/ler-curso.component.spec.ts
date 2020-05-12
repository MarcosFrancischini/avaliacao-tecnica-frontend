import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LerCursoComponent } from './ler-curso.component';

describe('LerCursoComponent', () => {
  let component: LerCursoComponent;
  let fixture: ComponentFixture<LerCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LerCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LerCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
