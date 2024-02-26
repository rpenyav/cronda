import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BanksTypeService } from './banks.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  banksTypes: any[] = [];

  constructor(
    private banksTypeService: BanksTypeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBanksTypes();
  }

  getBanksTypes(): void {
    this.banksTypeService.getBanksTypes().subscribe({
      next: (data: any[]) => {
        this.banksTypes = data;
        this.cdRef.detectChanges(); // Detecta cambios después de actualizar los datos
      },
      error: (error) => {
        console.error('Error al obtener los banks:', error);
      },
      complete: () => {
        console.log('Obtención de banks completada');
      },
    });
  }
}
