import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';


const modules=[
  MatAutocompleteModule,MatButtonModule
  ,MatCardModule,MatChipsModule,
  MatFormFieldModule,MatInputModule,
  MatIconModule,MatListModule,
  MatTableModule,MatTooltipModule,
  MatDialogModule,MatSnackBarModule,MatBadgeModule,MatToolbarModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports:[modules]
})
export class MatmoduleModule { }
