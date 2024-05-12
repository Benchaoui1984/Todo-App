import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TABLE_ACTION } from '../../enums/table-action.enum';
import { TableAction } from '../../models/table-action.model';
import { TableColumn } from '../../models/table-column.model';
import { TableConfig } from '../../models/table-config.model';
import { Observable } from 'rxjs';

export interface ColumnsToFilter {
  placeholder: string;
  column: string;
  options: string[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  tableDisplayColumns: string[] = [];
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() loading$!: Observable<boolean>;
  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  @Input() set columns(columns: TableColumn[]) {
    this.tableColumns = columns;
    this.tableDisplayColumns = this.tableColumns.map((col) => col.def);
  }

  @Input() set config(config: TableConfig) {
    this.setConfig(config);
  }

  @Output() action: EventEmitter<TableAction> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.showActions) {
      this.tableDisplayColumns.push('actions');
    }
  }

  onView(row: any) {
    this.action.emit({ action: TABLE_ACTION.VIEW, row });
  }

  onDelete(row: any) {
    this.action.emit({ action: TABLE_ACTION.DELETE, row });
  }
}
