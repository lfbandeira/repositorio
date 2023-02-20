import { Chave } from './model/chave';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';

import { LoginService } from '../login/login.service';
import { Produto } from './model/produto';
import { ProdutoService } from './produto.service';
import { ConsultaPaginada } from './model/consultaPaginada';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent {
  usuario: string = '';
  inscricao: Subscription = new Subscription();
  produtos: Produto[];
  chave: Chave[] = [];
  proximaChave: Object;
  consultaPaginada: ConsultaPaginada[] = [];

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.usuario = this.loginService.idUsuario;

    this.criaChaveNula();
    this.onListPaginado();

    this.produtoService.buscaChave().subscribe((dados) => {
      this.chave = dados;
    });
  }
  onListPaginado() {
    this.consultaPaginada = [];
    this.consultaPaginada.push({
      cpf_cnpj: this.loginService.cpf_cnpj,
      limite: '5',
      ultimaChave: this.proximaChave,
    });
    this.produtoService.consultaPaginada(this.consultaPaginada[0]).subscribe(
      (result) => {
        const aux = JSON.stringify(result);
        const obj = JSON.parse(aux);

        if (obj.Items) {
          this.produtos = obj.Items;
        } else {
          this.produtos = obj;
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

  onError(errorMsg: string) {
    console.log(errorMsg);
  }

  limpaFiltro() {
    this.criaChaveNula();
    this.onListPaginado();
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

    this.router.navigate(['/novoproduto'], { relativeTo: this.route });
  }
  onEdit(produto: Produto) {
    this.loginService.chave = produto.idProduto;
    this.router.navigate(['/editaproduto', produto.idProduto], {
      relativeTo: this.route,
    });
  }

  criaChaveNula() {
    this.proximaChave = { cpf_cnpj: '', idProduto: '' };
  }

  onList(idproduto: string) {
    if (idproduto) {
      this.criaChaveNula();

      this.produtoService.listarPorId(idproduto).subscribe(
        (result) => {
          this.produtos = result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
