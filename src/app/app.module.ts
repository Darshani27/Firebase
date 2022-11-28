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
import { ProductListComponent } from './component/product-list/product-list.component';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { UpdateDetailComponent } from './component/update-detail/update-detail.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptor/token-interceptor.interceptor';
import { ForgotPaswordComponent } from './component/forgot-pasword/forgot-pasword.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { MatmoduleModule } from './shared/matmodule/matmodule.module';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PaymentComponent } from './component/payment/payment.component';
import { MenuComponent } from './component/menu/menu.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { HomeComponent } from './component/home/home.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { UsersListComponent } from './component/users-list/users-list.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { CategoryPageComponent } from './component/category-page/category-page.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { ManageAddressComponent } from './component/manage-address/manage-address.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { SellerPageComponent } from './component/seller-page/seller-page.component';
import { QuestionMappingComponent } from './component/question-mapping/question-mapping.component';
import { SellerDashboardComponent } from './component/seller-dashboard/seller-dashboard.component';
import { DummyComponent } from './component/dummy/dummy.component';
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
    VerifyEmailComponent,
    UserDashboardComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    PaymentComponent,
    MenuComponent,
    UserProfileComponent,
    HomeComponent,
    OrderHistoryComponent,
    UsersListComponent,
    ChangePasswordComponent,
    CategoryPageComponent,
    AddCategoryComponent,
    ManageAddressComponent,
    ProductDetailComponent,
    SellerPageComponent,
    QuestionMappingComponent,
    SellerDashboardComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatmoduleModule,
    FlexLayoutModule,
    GooglePlaceModule,
    AngularFireStorageModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  exports:[MatmoduleModule]
})
export class AppModule { }
