import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { ProductTypesComponent } from './productTypes/productTypes.component';
import { MaterialModule } from './material/material.module';
import {ChartModule} from 'primeng/chart';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductsComponent,
    ProductTypesComponent,
    UserSettingsComponent,
    AdminComponent,
    ForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ChartModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'product-types', component: ProductTypesComponent, canActivate: [AuthGuard] },
      { path: 'user-settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'forbidden', component: ForbiddenComponent },
    ])
  ],
  providers: [AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
