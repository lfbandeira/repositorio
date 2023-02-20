import { FormAvariaModule } from './componentes/form-avaria/form-avaria.module';
import { FormVendaModule } from './componentes/form-venda/form-venda.module';
import { FormAporteModule } from './componentes/form-aporte/form-aporte.module';
import { TransferenciaModule } from './componentes/form-transferencia/form-transferencia.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EstoqueComponent } from './estoque.component';
import { EstoqueService } from './estoque.service';
import { RelEstoqueComponent } from './rel-estoque/rel-estoque.component';

@NgModule({
    declarations: [
        EstoqueComponent,
        RelEstoqueComponent
    ],
    providers: [
        EstoqueService
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatTableModule,
        MatDialogModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        TransferenciaModule,
        FormAporteModule,
        FormVendaModule,
        FormAvariaModule
    ]
})
export class EstoqueModule {}
