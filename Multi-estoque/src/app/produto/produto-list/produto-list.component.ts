import { Produto } from './../model/produto';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss'],
})
export class ProdutoListComponent {
  @Input() produtos: Produto[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() list = new EventEmitter(false);


  parametroConsulta:string='';

  readonly displayedColumns = [
    'idProduto',
    'descricao',
    'descEmbalagem',
    'acoes',
  ];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }
  onEdit(produto: Produto) {
    this.edit.emit(produto);
  }
  onList() {
    this.list.emit(this.parametroConsulta);
    this.parametroConsulta='';
  }
}
