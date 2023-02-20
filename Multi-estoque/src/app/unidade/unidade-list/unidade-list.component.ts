import { Unidade } from './../model/unidade';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styleUrls: ['./unidade-list.component.scss'],
})
export class UnidadeListComponent {
  @Input() unidades: Unidade[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() list = new EventEmitter(false);
  parametroConsulta: string = '';

  readonly displayedColumns = [
    'idUnidade',
    'descricao',
    'cidade',
    'bairro',
    'acoes',
  ];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }
  onEdit(unidade: Unidade) {
    this.edit.emit(unidade);
  }

  onList() {
    this.list.emit(this.parametroConsulta);
    this.parametroConsulta='';
  }
}
