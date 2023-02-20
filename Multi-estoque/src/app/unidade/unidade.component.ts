import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { Chave } from '../produto/model/chave';
import { ConsultaPaginada } from './model/consultaPaginada';
import { Unidade } from './model/unidade';
import { UnidadeService } from './unidade.service';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit{
  usuario: string = '';
  inscricao: Subscription = new Subscription();
  unidades: Unidade[];
  chave : Chave[] =[] ;
  consultaPaginada: ConsultaPaginada[] = [];
  proximaChave: Object;

  constructor(
    private route: ActivatedRoute,
    private unidadeService: UnidadeService,
    private loginService:LoginService,
    private router: Router,
  ) {
    this.usuario=this.loginService.idUsuario;
    this.unidadeService.buscaChave().subscribe(dados=>{
      this.chave=dados;
    })

    this.criaChaveNula();
    this.onListPaginado();
  }

  onListPaginado() {
    this.consultaPaginada = [];
    this.consultaPaginada.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      limite: '5',
      ultimaChave: this.proximaChave,
    });
    this.unidadeService.consultaPaginada(this.consultaPaginada[0]).subscribe(
      (result) => {
        const aux = JSON.stringify(result);
        const obj = JSON.parse(aux);

        if (obj.Items) {
          this.unidades = obj.Items;
        } else {
          this.unidades = obj;
        }

        if (obj.LastEvaluatedKey) {
          this.proximaChave = obj.LastEvaluatedKey;
        } else {
          this.criaChaveNula();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  limpaFiltro(){
    this.criaChaveNula();
    this.onListPaginado();
  }


  criaChaveNula() {
    this.proximaChave = { cpf_cnpj: '', idUnidade: '' };
  }


  onList(idUnidade: string) {
    if (idUnidade) {
      this.criaChaveNula();
      this.unidadeService.listarPorId(idUnidade).subscribe(
        (result) => {
          this.unidades = result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onError(errorMsg:string){
    console.log(errorMsg);
  }



  ngOnInit(): void {
    this.criaChaveNula();

  }
  ngOndestroy() {
    this.inscricao.unsubscribe();
  }
  onAdd(){
    const retJson = JSON.stringify(this.chave);
    const json = JSON.parse(retJson);
    this.loginService.chave = json.proximoItem.toString();

    this.router.navigate(['/novaunidade'],{relativeTo:this.route})
  }
  onEdit(unidade:Unidade){
    this.loginService.chave=unidade.idUnidade;
    this.router.navigate(['/editaunidade', unidade.idUnidade],{relativeTo:this.route})
  }
}
