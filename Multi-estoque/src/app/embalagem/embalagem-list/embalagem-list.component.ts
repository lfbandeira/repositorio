import { Embalagem } from './../model/embalagem';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-embalagem-list',
  templateUrl: './embalagem-list.component.html',
  styleUrls: ['./embalagem-list.component.scss']
})
export class EmbalagemListComponent {
  @Input() embalagens: Embalagem[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() list = new EventEmitter(false);

  @Input() parametroConsulta:string='';

  spinner:boolean=true;

  readonly displayedColumns = ['idEmbalagem', 'descricao', 'acoes'];

  constructor() {

  }

  onAdd() {
    this.add.emit(true);
  }
  onEdit(embalagem:Embalagem){
    this.edit.emit(embalagem);
  }
  onList() {
    this.spinner=false;
    this.list.emit(this.parametroConsulta);
    this.parametroConsulta='';
    this.spinner=true;
  }



}
