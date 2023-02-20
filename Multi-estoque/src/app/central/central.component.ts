import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { CentralService } from './central.service';
import { Central } from './model/central';

@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.scss']
})
export class CentralComponent implements OnInit{
  usuario: string = '';
  inscricao: Subscription = new Subscription();
  centrais$: Observable<Central[]>;
  proximaChave:string='';

  constructor(
    private route: ActivatedRoute,
    private centralService: CentralService,
    private loginService:LoginService,
    private router: Router,
  ) {
    this.usuario=this.loginService.idUsuario;

    this.centrais$ = this.centralService.listar().pipe(
      catchError((error) => {
       this.onError('Erro ao carregar Centrais')
        return of([]);
      })
    );



  }

  onError(errorMsg:string){
    console.log(errorMsg);
  }



  ngOnInit(): void {


  }
  ngOndestroy() {
    //this.inscricao.unsubscribe();
  }
  onAdd(){
    this.proximaChave = this.loginService.chave;
    this.router.navigate(['/novacentral'],{relativeTo:this.route})
  }
  onEdit(central:Central){
    this.loginService.chave=central.idCentral;
    this.router.navigate(['/editacentral'],{relativeTo:this.route})
  }
}
