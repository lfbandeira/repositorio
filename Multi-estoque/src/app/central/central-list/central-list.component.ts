import { Central } from './../model/central';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-central-list',
  templateUrl: './central-list.component.html',
  styleUrls: ['./central-list.component.scss']
})
export class CentralListComponent {
  @Input() centrais: Central[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);


  readonly displayedColumns = ['idCentral', 'cpf_cnpj', 'descricao', 'cidade', 'bairro', 'acoes'];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }
  onEdit(central:Central){
    this.edit.emit(central);
  }
}
