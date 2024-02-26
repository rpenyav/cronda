import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'ca', label: 'Català' },
  ];
  selectedLanguage: string = 'ca';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const pathLang = this.router.url.split('/')[1];
    this.selectedLanguage =
      this.languages.find((lang) => lang.code === pathLang)?.code || 'ca';
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('userLang', lang);

    const currentRouteSegments = this.router.url.split('/').slice(2);

    const newRoute = ['/', lang, ...currentRouteSegments].join('/');

    this.router.navigateByUrl(newRoute);
    this.selectedLanguage = lang;
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Serás desconectado de tu cuenta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
