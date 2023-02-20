import { Usuario } from './../model/usuario';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent {
  @Input() usuarios: Usuario[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() list = new EventEmitter(false);
  parametroConsulta:string='';

  readonly displayedColumns = ['login',  'nome',   'acoes'];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }
  onList() {
    this.list.emit(this.parametroConsulta);
    this.parametroConsulta='';
  }
  onEdit(central:Usuario){
    this.edit.emit(central);
  }
}
