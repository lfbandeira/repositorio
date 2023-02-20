import { ConsultaPaginada } from './model/consultaPaginada';
import { EmbalagemService } from './embalagem.service';
import { Embalagem } from './model/embalagem';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';

@Component({
  selector: 'app-embalagem',
  templateUrl: './embalagem.component.html',
  styleUrls: ['./embalagem.component.scss'],
})
export class EmbalagemComponent implements OnInit {
  usuario: string = '';
  inscricao: Subscription = new Subscription();
  embalagens: Embalagem[];
  consultaPaginada: ConsultaPaginada[] = [];
  proximaChave: Object;
  habilitaNavegador:boolean=false;
  spinner:boolean=true;
  chave: Chave[] = [];
  constructor(
    private route: ActivatedRoute,
    private embalagemService: EmbalagemService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.embalagemService.buscaChave().subscribe((dados) => {
      this.chave = dados;
    });

    this.usuario = this.loginService.idUsuario;
    this.criaChaveNula();
    this.onListPaginado();

  }

  limpaFiltro(){
    this.criaChaveNula();
    this.onListPaginado();
  }
  onError(errorMsg: string) {
    console.log(errorMsg);
  }

  criaChaveNula() {
    this.proximaChave = { cpf_cnpj: '', idEmbalagem: '' };
  }

  ngOnInit(): void {
    this.criaChaveNula();
  }

  ngOndestroy() {
    this.inscricao.unsubscribe();
  }

  onAdd() {
    const retJson = JSON.stringify(this.chave);
    const json = JSON.parse(retJson);
    this.loginService.chave = json.proximoItem.toString();
    this.router.navigate(['/novaembalagem'], { relativeTo: this.route });
  }

  onEdit(embalagem: Embalagem) {
    this.loginService.chave = embalagem.idEmbalagem;
    this.router.navigate(['/editaembalagem', embalagem.idEmbalagem], {
      relativeTo: this.route,
    });
  }

  onListPaginado() {
    this.consultaPaginada = [];
    this.consultaPaginada.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      limite: '5',
      ultimaChave: this.proximaChave,
    });
    this.embalagemService.consultaPaginada(this.consultaPaginada[0]).subscribe(
      (result) => {
        const aux = JSON.stringify(result);
        const obj = JSON.parse(aux);

        if (obj.Items) {
          this.embalagens = obj.Items;
        } else {
          this.embalagens = obj;
        }

        if (obj.LastEvaluatedKey) {
          this.proximaChave = obj.LastEvaluatedKey;
          this.habilitaNavegador=true;
        } else {
          this.criaChaveNula();
          this.habilitaNavegador=false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onList(idEmbalagem: string) {
    if (idEmbalagem) {
      this.criaChaveNula();
      this.habilitaNavegador=false;
      this.embalagemService.listarPorId(idEmbalagem).subscribe(
        (result) => {
          this.embalagens = result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
