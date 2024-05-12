import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColumnValuePipe } from './pipes/column-value.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TableComponent, ColumnValuePipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
