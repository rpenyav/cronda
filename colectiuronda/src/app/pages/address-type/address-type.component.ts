import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddressTypeService } from './address-type.service';

@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: ['./address-type.component.scss'],
})
export class AddressTypeComponent implements OnInit {
  addressTypes: any[] = [];

  constructor(
    private addressTypeService: AddressTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAddressTypes();
  }

  getAddressTypes(): void {
    this.addressTypeService.getAddressTypes().subscribe({
      next: (data: any[]) => {
        this.addressTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los addressType:', error);
      },
      complete: () => {
        console.log('Obtención de addressType completada');
      },
    });
  }
}
