import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import { ProductListComponent } from './component/product-list/product-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { UpdateDetailComponent } from './component/update-detail/update-detail.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptor/token-interceptor.interceptor';
import { ForgotPaswordComponent } from './component/forgot-pasword/forgot-pasword.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductListComponent,
    ConfirmDialogComponent,
    UpdateDetailComponent,
    PageNotFoundComponent,
    ForgotPaswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,MatIconModule,MatInputModule,MatChipsModule,MatAutocompleteModule,MatTableModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  exports:[MatSnackBarModule,MatDialogModule,MatTooltipModule,MatTableModule,MatListModule,MatButtonModule,MatCardModule,MatFormFieldModule,MatIconModule,MatInputModule,MatChipsModule,MatAutocompleteModule]
})
export class AppModule { }
