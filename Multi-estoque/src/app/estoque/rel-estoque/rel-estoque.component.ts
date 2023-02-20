import { Component, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { ProdutoService } from 'src/app/produto/produto.service';



import { EstoqueService } from './../estoque.service';
import { Relatorio } from './model/relatorio';

@Component({
  selector: 'app-rel-estoque',
  templateUrl: './rel-estoque.component.html',
  styleUrls: ['./rel-estoque.component.scss'],
})


export class RelEstoqueComponent {
  @Output() rel: Relatorio[] = [];
  idProduto: string = '';
  desabilitaSpinner:boolean=true;
  descProduto: string = '';


  form = this.formBuilder.group({
    idProduto: ["", Validators.required],
    descProduto: ["", Validators.required]
  });

  readonly displayedColumns = [
    'descProduto',
    'descEmbalagem',
    'descUnidade',
    'totalEmEstoque',
  ];

  constructor(
    private estoqueService: EstoqueService,
    private loginService:LoginService,
    private produtoService: ProdutoService,
    private formBuilder: NonNullableFormBuilder,
  ) {
    this.estoqueService.buscaUnidades().then((dados) => {});

  }


  consultaProduto(){
    this.desabilitaSpinner=false;
    try{
      this.rel=[];
      this.form.get('descProduto').setValue('')
      const aux = this.form.value.idProduto;

    this.produtoService.listarPorId(aux).subscribe((dados) => {

        if (dados.length > 0) {
          const json = JSON.stringify(dados)
          const aux = JSON.parse(json)

          if(aux.descProduto!=''){
            this.descProduto = dados[0].descricao;
            this.form.get('descProduto').setValue(dados[0].descricao)
            this.desabilitaSpinner=true;
          }else{
            this.descProduto='';
            this.form.get('descProduto').setValue('')
            this.desabilitaSpinner=true;
          }

        }


    });
  }catch(erro){
    this.desabilitaSpinner=true;
    console.log('Erro ao consultra produto...')
  }
  }


  onError(errorMsg:string){
    console.log(errorMsg);
  }


  async PreencheObjetos() {

    return this.estoqueService.unidades.forEach((element) => {
      this.rel=[];
      const chave = element.idUnidade + '|' + this.form.value.idProduto;
      this.estoqueService.buscaEstoque(chave).then((dados) => {
        const aux = JSON.stringify(this.estoqueService.retorno);
        const objetojson = JSON.parse(aux);
        this.rel = objetojson;

      });
    });
  }

  onList() {
    this.rel=[];
    this.PreencheObjetos().then(() => {
    });
  }

}
