import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bank } from 'src/app/interfaces/banks';
import { GeneralService } from 'src/app/services/general.service';
import { API_ENDPOINTS } from 'src/app/constants/api-endpoints.constants';

@Component({
  selector: 'app-banks-detail',
  templateUrl: './banks-detail.component.html',
  styleUrls: ['./banks-detail.component.scss'],
})
export class BanksDetailComponent implements OnInit {
  private ENDPOINT = API_ENDPOINTS.BANKS_ENDPOINT;
  id: string | null = null;
  bankDetail: Bank | null = null;
  loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadBankDetail();
  }

  loadBankDetail(): void {
    const idNum = Number(this.id);
    if (!isNaN(idNum)) {
      this.generalService
        .getRegisterTypeById<Bank>(this.ENDPOINT, idNum)
        .subscribe({
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
