import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;
  showFiller = false;
  faClipboard = faClipboard;
  faUser = faUser;
  faHouse = faHouse;
  faTruckFast = faTruckFast;
  faGift = faGift;
  faList = faList;

  idUsuario: string = '';
  cpf_cnpj: string = '';

  mostrarMenu: boolean = false;

  buscaParametros() {
    if (this.mostrarMenu) {
      this.cpf_cnpj = this.loginService.cpf_cnpj;
      this.idUsuario = this.loginService.idUsuario;
   }
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginService.mostrarMenuEmitter.subscribe(
      (mostrar) => (this.mostrarMenu = mostrar)
    );
    this.buscaParametros();
  }

  goList() {}
  goForm(rota: string) {
    switch (rota) {
      case 'central':
        this.router.navigate(['/central'], { relativeTo: this.route });
        break;
      case 'embalagem':
        this.router.navigate(['/embalagem'], { relativeTo: this.route });
        break;
      case 'produto':
        this.router.navigate(['/produto'], { relativeTo: this.route });
        break;
      case 'unidade':
        this.router.navigate(['/unidade'], { relativeTo: this.route });
        break;
      case 'estoque':
        this.router.navigate(['/estoque'], { relativeTo: this.route });
        break;
      case 'usuario':
        this.router.navigate(['/usuario'], { relativeTo: this.route });
        break;
      case 'relEstoque':
        this.router.navigate(['/relestoque'], { relativeTo: this.route });
        break;
    }
  }
}
