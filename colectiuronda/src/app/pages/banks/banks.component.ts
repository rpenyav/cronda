import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaginatedResponse, Bank } from 'src/app/interfaces/banks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { showCustomAlert } from 'src/utils/showCustomAlert';
import { Router } from '@angular/router';
import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { GeneralService } from 'src/app/services/general.service';
import { API_ENDPOINTS } from 'src/app/constants/api-endpoints.constants';
import { FormField } from 'src/app/shared/formulario/formulario.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {
  public ENDPOINT = API_ENDPOINTS.BANKS_ENDPOINT;
  banksData: Bank[] = [];
  filteredRegistersData: Bank[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  allDatAll: Bank[] = []; //muestra todo los regitros para e filtrado
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
    public generalService: GeneralService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private txt: TranslateService,
    private router: Router
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
    return localStorage.getItem('userLang') ?? 'ca';
  }

  // ---------------------------------------------------------------------------
  // métodos de la modal
  // ---------------------------------------------------------------------------

  openModal(action: 'edit' | 'view' | 'add', register: any = null) {
    this.currentAction = action;
    this.selectedRegister = register;

    if (action === 'edit') {
      this.editFormConfig = this.editFormConfig.map((field) => {
        if (field.key === 'id') {
          return { ...field, initialValue: register.id };
        } else {
          return { ...field, initialValue: register[field.key] };
        }
      });

      this.modalService.open(this.modalContent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      });
    } else if (action === 'add') {
      this.modalService.open(this.modalContent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
      });
    }
  }

  // ---------------------------------------------------------------------------
  // carga de datos
  // ---------------------------------------------------------------------------

  loadAllRegisters(): void {
    this.generalService
      .getRegisterTypes<PaginatedResponse>(this.ENDPOINT)
      .subscribe({
        next: (data: PaginatedResponse) => {
          console.log('allDatAll', this.allDatAll);
          this.allDatAll = data.list;
        },
        error: (error) => console.error(error),
      });
  }

  getRegisters(): void {
    this.generalService
      .getRegisterTypes<PaginatedResponse>(
        this.ENDPOINT,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (data: PaginatedResponse) => {
          console.log('allDatAll', this.allDatAll);
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

  /**
   * Inicialitza els camps del formulari amb els seus respectius validators.
   * Defineix la estructura del formulari, incloent els camps `id`, `name`, `code`, `swift`, i un grup anidat per a `country`.
   */
  formfields(): void {
    this.formForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      swift: [''],
      country: this.fb.group({
        id: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      }),
    });
  }

  /**
   * Configuració dels camps per al formulari d'addició. Especifica els camps necessaris i els seus validators.
   */
  addFormConfig: FormField[] = [
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      validators: [Validators.required],
    },
    {
      key: 'code',
      label: 'Código',
      type: 'text',
      validators: [Validators.required],
    },
  ];

  /**
   * Configuració dels camps per al formulari d'edició. Afegeix camps addicionals com `id` i `country.id` respecte a la configuració d'addició.
   */
  editFormConfig: FormField[] = [
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      validators: [Validators.required],
    },
    {
      key: 'code',
      label: 'Código',
      type: 'text',
      validators: [Validators.required],
    },
    {
      key: 'id',
      label: 'ID',
      type: 'hidden',
      initialValue: '',
    },
    {
      key: 'country.id',
      label: 'Country ID',
      type: 'number',
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
      initialValue: 1,
    },
  ];

  /**
   * Retorna la configuració actual dels camps del formulari basant-se en l'acció que s'està realitzant (`add` o `edit`).
   * @returns {FormField[]} La configuració dels camps del formulari per a l'acció actual.
   */
  get currentFormConfig(): FormField[] {
    return this.currentAction === 'add'
      ? this.addFormConfig
      : this.editFormConfig;
  }

  /**
   * Maneja la tramesa del formulari. Construeix la dada del formulari i crida el mètode corresponent per a crear o editar el registre.
   * @param {any} formValue - El valor actual del formulari.
   */
  handleFormSubmit(formValue: any): void {
    const formData = { ...formValue, code: parseInt(formValue.code, 10) };
    if (this.currentAction === 'add') {
      //TODO country.id hasta colocar el slector
      formData.country = { id: formData.country?.id || 1 };
      this.create(formData);
    } else if (this.currentAction === 'edit' && this.selectedRegister) {
      formData.id = this.selectedRegister.id;
      this.edit(formData);
    }
  }

  // ---------------------------------------------------------------------------
  // métodos de CRUD
  // ---------------------------------------------------------------------------

  create(bankData: Bank) {
    console.log('Enviando datos al servidor:', bankData);
    this.generalService
      .createRegisterType<Bank>(this.ENDPOINT, bankData)
      .subscribe({
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

    this.generalService
      .updateRegisterType<Bank, Bank>(this.ENDPOINT, bank.id, bank)
      .subscribe({
        next: (response) => {
          console.log('response', response);
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
        this.generalService
          .deleteRegisterType<Bank>(this.ENDPOINT, bank.id)
          .subscribe({
            next: (response) => {
              console.log('Respuesta de la solicitud DELETE:', response);
              this.getRegisters();
            },
            error: (error) => {
              console.error('Error ocurrido en deleteRegisterType:', error);
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

      this.generalService
        .uploadFileToServer(this.ENDPOINT, this.selectedFile)
        .subscribe({
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
