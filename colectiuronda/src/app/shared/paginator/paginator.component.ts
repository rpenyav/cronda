import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() pageSize: number = 0;
  @Input() totalElements: number = 0;
  @Input() pageNumber: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    const savedPageNumber = localStorage.getItem('pageNumber');
    if (savedPageNumber) {
      this.pageNumber = parseInt(savedPageNumber, 10);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    localStorage.setItem('pageNumber', this.pageNumber.toString());
    this.pageChange.emit(pageNumber);
  }
}
