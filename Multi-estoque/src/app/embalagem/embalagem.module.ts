import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EmbalagemFormComponent } from './embalagem-form/embalagem-form.component';
import { EmbalagemListComponent } from './embalagem-list/embalagem-list.component';
import { EmbalagemComponent } from './embalagem.component';
import { EmbalagemService } from './embalagem.service';

@NgModule({
  declarations: [
    EmbalagemListComponent,
    EmbalagemComponent,
    EmbalagemFormComponent

  ],
  imports:[
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
    BrowserAnimationsModule
  ],

  providers:[
    EmbalagemService
  ],
})
export class EmbalagemModule{}
