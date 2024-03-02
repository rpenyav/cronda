import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BanksTypeService } from './banks.service';
import { PaginatedResponse, Bank } from 'src/app/interfaces/banks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { showCustomAlert } from 'src/utils/showCustomAlert';
import { Router } from '@angular/router';
import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  banksData: Bank[] = [];
  allBanksData: Bank[] = [];
  filteredRegistersData: Bank[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  allDatAll: Bank[] = []; //muestra todo los regitros para e filtrado
  totalElements: number = 0;
  loading: boolean = true;
  isLoadingCSV: boolean = false;
  filterValue: string = '';
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  currentAction!: string;
  selectedRegister: any;
  modalTitle!: string;
  formForm!: FormGroup;
  orderDirection: string = 'asc';
  orderBy: string = 'name';
  icono!: string;
  @ViewChild('uploadModal')
  uploadModal!: TemplateRef<any>;
  selectedFile: File | null = null;

  isValidFile: boolean = true;
  errorFileMessage: string = '';

  constructor(
    public banksTypeService: BanksTypeService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private txt: TranslateService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.icono = MENU_ITEMS['banksType'].icon;
    const savedPageNumber = localStorage.getItem('pageNumber');
    if (savedPageNumber !== null) {
      this.pageNumber = +savedPageNumber;
    }
    this.loadAllRegisters();
    this.getRegisters();
    this.formfields();
  }

  getLangFromStorage(): string {
    return localStorage.getItem('userLang') || 'ca';
  }

  // ---------------------------------------------------------------------------
  // métodos de la modal
  // ---------------------------------------------------------------------------

  openModal(action: 'edit' | 'view' | 'add', register: any = null) {
    this.currentAction = action;
    this.selectedRegister = register;

    if (action === 'edit') {
      this.modalTitle = this.txt.instant('FORM.edit_province');
      this.formForm.patchValue({
        id: this.selectedRegister.id,
        name: this.selectedRegister.name,
        code: this.selectedRegister.code,
      });
    } else if (action === 'add') {
      this.modalTitle = this.txt.instant('FORM.new_record');
      this.formForm.reset();
    }

    this.modalService.open(this.modalContent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  // ---------------------------------------------------------------------------
  // carga de datos
  // ---------------------------------------------------------------------------

  loadAllRegisters(): void {
    this.banksTypeService.getBanksTypes(undefined, undefined).subscribe({
      next: (data: PaginatedResponse) => {
        this.allBanksData = data.list;
      },
      error: (error) => console.error(error),
    });
  }

  getRegisters(): void {
    this.banksTypeService
      .getBanksTypes(this.pageNumber, this.pageSize)
      .subscribe({
        next: (data: PaginatedResponse) => {
          this.banksData = data.list;
          this.allDatAll = data.allData;

          this.filteredRegistersData = [...this.banksData];
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.filterRegisters(this.filterValue);
        },
        error: (error) => console.error(error),
        complete: () => (this.loading = false),
      });
  }

  filterRegisters(filterValue: string): void {
    this.filterValue = filterValue;
    if (!this.filterValue) {
      this.filteredRegistersData = [...this.banksData];
    } else {
      this.filteredRegistersData = this.allDatAll.filter((register) =>
        register.name.toLowerCase().includes(this.filterValue.toLowerCase())
      );
    }
  }

  onSuggestionSelected(suggestion: any): void {
    //TODO Aquí es mostrará la resposta del filtre, un cop la rebem mostrarem els resultats

    console.log('Sugerencia seleccionada:', suggestion);
    // Aquí puedes manejar la sugerencia seleccionada,
    //por ejemplo, navegando a otro componente o mostrando detalles
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    localStorage.setItem('pageNumber', pageNumber.toString());
    this.getRegisters();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // ---------------------------------------------------------------------------
  // ORDENACIO
  //
  // ---------------------------------------------------------------------------

  toggleSort(field: string) {
    if (this.orderBy === field) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderBy = field;
      this.orderDirection = 'asc';
    }
    this.sortData();
  }

  sortData() {
    this.filteredRegistersData.sort((a, b) => {
      let comparison = 0;
      if ((a as any)[this.orderBy] < (b as any)[this.orderBy]) {
        comparison = -1;
      } else if ((a as any)[this.orderBy] > (b as any)[this.orderBy]) {
        comparison = 1;
      }
      return this.orderDirection === 'asc' ? comparison : -comparison;
    });
  }

  // ---------------------------------------------------------------------------
  // FORMULARIO
  // estos son los campos del formulario
  // ---------------------------------------------------------------------------

  formfields(): void {
    this.formForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      swift: [''],
      country: this.fb.group({
        id: [1, [Validators.pattern(/^\d+$/)]],
      }),
    });
  }

  onSubmitAdd(): void {
    if (this.formForm.valid) {
      const formData = this.formForm.value;
      formData.code = parseInt(formData.code, 10);
      if (!formData.country.id) {
        formData.country.id = 1;
      }

      this.create(formData);
    } else {
      console.log('El formulario no es válido.');
    }
  }

  onSubmit(): void {
    if (this.formForm.valid) {
      this.edit(this.formForm.value);
    }
  }

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(bankData: any) {
    console.log('Enviando datos al servidor:', bankData);
    this.banksTypeService.createBanksType(bankData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        showCustomAlert(this.txt, {
          titleKey: 'FORM.create_success_title',
          textKey: 'FORM.create_success_message',
          icon: 'success',
          confirmButtonTextKey: 'FORM.ok',
        });
        this.modalService.dismissAll();
        this.getRegisters();
      },
      error: (error) => {
        console.error('Error al crear el registro:', error);
        showCustomAlert(this.txt, {
          titleKey: 'FORM.create_error_title',
          textKey: 'FORM.create_error_message',
          icon: 'error',
          confirmButtonTextKey: 'FORM.ok',
        });
        // Asegúrate de manejar los errores específicos según el tipo o código de error.
      },
    });
  }

  /**
   * aqui definimos la ruta de la pagina de detalle
   * para ello definiremos aqui la ruta y añadiremos al componente shared dynamic-detail
   * no es necesario añadirla al routing component
   * @param bankId
   */
  viewDetails(bankId: string | number) {
    const currentLang = this.getLangFromStorage();
    this.router.navigate(['/' + currentLang + '/_/banks', bankId]);
  }

  /**
   * funcio de modificacio
   * @param bank
   */
  edit(bank: Bank) {
    console.log('bank', bank);

    this.banksTypeService.updateBanksType(bank.id, bank).subscribe({
      next: (response) => {
        showCustomAlert(this.txt, {
          titleKey: 'FORM.edit_success_title',
          textKey: 'FORM.edit_success_message',
          icon: 'success',
          confirmButtonTextKey: 'FORM.modify',
        });
        this.modalService.dismissAll();
        this.getRegisters();
      },
      error: (error) => {
        console.error('Error al editar el registro:', error);
        showCustomAlert(this.txt, {
          titleKey: 'FORM.edit_error_title',
          textKey: 'FORM.edit_error_message',
          icon: 'error',
          confirmButtonTextKey: 'FORM.ok',
        });
      },
    });
  }

  delete(bank: Bank) {
    const titleWithName = `${this.txt.instant('FORM.desea_eliminar')} "${
      bank.name
    }"?`;
    console.log('BANK DELETE', bank);
    showCustomAlert(this.txt, {
      titleKey: 'FORM.title_swa',
      textKey: 'FORM.text_swa',
      confirmButtonTextKey: 'FORM.yes_delete',
      showCancelButton: true,
      customTitle: titleWithName,
    }).then((result) => {
      if (result.isConfirmed) {
        this.banksTypeService.deleteBanksType(bank.id).subscribe({
          next: (response) => {
            console.log('Respuesta de la solicitud DELETE:', response);
            this.getRegisters();
          },
          error: (error) => {
            console.error('Error ocurrido en deleteBanksType:', error);
          },
        });
      }
    });
  }

  //-----------------------------------------------------------------
  // PUJADA MASSIVA de bancs
  //-----------------------------------------------------------------
  openUploadModal() {
    this.modalService.open(this.uploadModal);
  }

  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const fileExtension = file.name.split('.').pop();
      if (fileExtension?.toLowerCase() === 'csv') {
        this.selectedFile = file;
        this.isValidFile = true;
      } else {
        this.selectedFile = null;
        this.isValidFile = false;
        this.errorFileMessage = 'Por favor, selecciona un archivo CSV.';
      }
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.isLoadingCSV = true;

      this.banksTypeService.uploadFileToServer(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Archivo CSV procesado con éxito', response);
          this.isLoadingCSV = false;
          this.modalService.dismissAll();

          this.loadAllRegisters();
          // llamar a getRegisters si solo necesito recargar la página actual
          // this.getRegisters();
        },
        error: (error) => {
          console.error('Error al procesar el archivo CSV', error);
          this.isLoadingCSV = false;
        },
      });
    } else {
      console.log('No file selected');
    }
  }
}
