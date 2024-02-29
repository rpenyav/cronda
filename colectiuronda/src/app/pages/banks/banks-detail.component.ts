import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bank } from 'src/app/interfaces/banks';
import { BanksTypeService } from './banks.service';

@Component({
  selector: 'app-banks-detail',
  templateUrl: './banks-detail.component.html',
  styleUrls: ['./banks-detail.component.scss'],
})
export class BanksDetailComponent implements OnInit {
  id: string | null = null;
  bankDetail: Bank | null = null;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private banksTypeService: BanksTypeService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadBankDetail();
  }

  loadBankDetail(): void {
    const idNum = Number(this.id);
    if (!isNaN(idNum)) {
      this.banksTypeService.getBankTypeById(idNum).subscribe({
        next: (bank: Bank | null) => {
          this.bankDetail = bank;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error al recuperar el detalle del registro:', error);
          this.loading = false;
        },
        complete: () => {
          console.log('data loaded');
        },
      });
    } else {
      this.loading = false;
    }
  }
}
