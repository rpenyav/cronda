import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AddressTypeComponent } from './pages/address-type/address-type.component';
import { BanksComponent } from './pages/banks/banks.component';
import { CarpetasComponent } from './pages/carpetas/carpetas.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';
import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { ProvincesComponent } from './pages/provinces/provinces.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FilterComponent } from './shared/filter/filter.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';
import { ProvincesDetailComponent } from './pages/provinces/provinces-detail.component';
import { BanksDetailComponent } from './pages/banks/banks-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FilterInputComponent } from './shared/filter-input/filter-input.component';
import { FormularioComponent } from './shared/formulario/formulario.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

function initApp() {
  return () => {
    if (!localStorage.getItem('userLang')) {
      localStorage.setItem('userLang', 'ca');
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LoginComponent,
    AddressTypeComponent,
    BanksComponent,
    CarpetasComponent,
    DomainsComponent,
    CnaeComponent,
    DocumentsComponent,
    PayMethodsComponent,
    ParametersComponent,
    ProEcoComponent,
    RelEmpresasComponent,
    RepLegalsComponent,
    ProvincesComponent,
    PaginatorComponent,
    LoaderComponent,
    FilterComponent,
    DynamicDetailComponent,
    ProvincesDetailComponent,
    BanksDetailComponent,
    SettingsComponent,
    FilterInputComponent,
    FormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,

    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
