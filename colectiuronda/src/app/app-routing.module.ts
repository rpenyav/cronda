import { PayMethodsComponent } from './pages/pay-methods/pay-methods.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

import { canActivate } from './auth/guards/auth.guard';
import { AddressTypeComponent } from './pages/address-type/address-type.component';
import { BanksComponent } from './pages/banks/banks.component';
import { CarpetasComponent } from './pages/carpetas/carpetas.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { CnaeComponent } from './pages/cnae/cnae.component';
import { DocumentsComponent } from './pages/documentos/documents.component';
import { RepLegalsComponent } from './pages/rep-legals/rep-legals.component';
import { RelEmpresasComponent } from './pages/rel-empresas/rel-empresas.component';
import { ProEcoComponent } from './pages/pro-eco/pro-eco.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { ProvincesComponent } from './pages/provinces/provinces.component';
import { DynamicDetailComponent } from './shared/dynamic-detail/dynamic-detail.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/ca/home', pathMatch: 'full' },

  {
    path: ':lang',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'addresstype',
        component: AddressTypeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'banks',
        component: BanksComponent,
        canActivate: [canActivate],
      },
      {
        path: 'carpetas',
        component: CarpetasComponent,
        canActivate: [canActivate],
      },
      {
        path: 'domains',
        component: DomainsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'cnae',
        component: CnaeComponent,
        canActivate: [canActivate],
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rep-legal',
        component: RepLegalsComponent,
        canActivate: [canActivate],
      },

      {
        path: 'pro-eco',
        component: ProEcoComponent,
        canActivate: [canActivate],
      },
      {
        path: 'pay-methods',
        component: PayMethodsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'parameters',
        component: ParametersComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rel-empresas',
        component: RelEmpresasComponent,
        canActivate: [canActivate],
      },
      {
        path: 'rep-legal',
        component: RepLegalsComponent,
        canActivate: [canActivate],
      },
      {
        path: 'locations/provinces',
        component: ProvincesComponent,
        canActivate: [canActivate],
      },
      {
        path: ':category/:type/:id',
        component: DynamicDetailComponent,
        canActivate: [canActivate],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [canActivate],
      },
    ],
  },
  { path: '**', redirectTo: '/ca/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
