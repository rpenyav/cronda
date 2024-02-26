import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomainsTypeService } from './domains.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss'],
})
export class DomainsComponent implements OnInit {
  domainsTypes: any[] = [];

  constructor(
    private domainsTypeService: DomainsTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDomainsTypes();
  }

  getDomainsTypes(): void {
    this.domainsTypeService.getDomainsTypes().subscribe({
      next: (data: any[]) => {
        this.domainsTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los domains:', error);
      },
      complete: () => {
        console.log('Obtención de domains completada');
      },
    });
  }
}
