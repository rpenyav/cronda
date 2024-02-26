import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CnaeTypeService } from './cnae.service';

@Component({
  selector: 'app-cnae',
  templateUrl: './cnae.component.html',
  styleUrls: ['./cnae.component.scss'],
})
export class CnaeComponent implements OnInit {
  cnaeTypes: any[] = [];

  constructor(
    private cnaeTypeService: CnaeTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCnaeTypes();
  }

  getCnaeTypes(): void {
    this.cnaeTypeService.getCnaeTypes().subscribe({
      next: (data: any[]) => {
        this.cnaeTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los cnae:', error);
      },
      complete: () => {
        console.log('Obtención de cnae completada');
      },
    });
  }
}
