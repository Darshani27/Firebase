import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPaswordComponent } from './component/forgot-pasword/forgot-pasword.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { RegisterComponent } from './component/register/register.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'forgot-password',component:ForgotPaswordComponent},
  {path:'verify-email',component:VerifyEmailComponent},
  {path:'user-dashboard',component:UserDashboardComponent},
  {path:'shopping-cart',component:ShoppingCartComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
