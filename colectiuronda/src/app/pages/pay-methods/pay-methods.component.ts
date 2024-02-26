import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PayMethodsTypeService } from './pay-methods.service';

@Component({
  selector: 'app-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss'],
})
export class PayMethodsComponent implements OnInit {
  payMethodsTypes: any[] = [];

  constructor(
    private payMethodsTypeService: PayMethodsTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getpayMethodsTypes();
  }

  getpayMethodsTypes(): void {
    this.payMethodsTypeService.getpayMethodsTypes().subscribe({
      next: (data: any[]) => {
        this.payMethodsTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los payMethods:', error);
      },
      complete: () => {
        console.log('Obtención de payMethods completada');
      },
    });
  }
}
