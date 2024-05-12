import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, merge, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { TableColumn } from '../../../shared/table/models/table-column.model';
import { TableConfig } from '../../../shared/table/models/table-config.model';
import { AppStateInterface } from '../../../models/appState.interface';
import { TABLE_ACTION } from '../../../shared/table/enums/table-action.enum';
import { TableAction } from '../../../shared/table/models/table-action.model';
import { TodosActions } from '../../../store/actions';
import {
  errorSelector,
  isLoadingSelector,
  todosSelector,
} from '../../../store/selectors';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-customers',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig = {
    isSelectable: false,
    isPaginable: true,
    showActions: true,
    showFilter: true,
  };
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  todos$: Observable<any> | undefined;
  loading$!: Observable<boolean>;

  private destroySubject = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStateInterface>,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {
    this.initDispatch();
    this.initSubscriptions();
  }

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
    this.setTableColumns();

    merge().pipe(takeUntil(this.destroySubject)).subscribe();
  }

  onTableAction(tableAction: TableAction) {
    switch (tableAction.action) {
      case TABLE_ACTION.VIEW:
        this.onView(tableAction.row);
        break;
      case TABLE_ACTION.DELETE:
        this.onDelete(tableAction.row);
        break;
    }
  }

  onView(breed: any) {
    this.store.dispatch(TodosActions.getOne({ id: breed.id }));
    this.router.navigate(['view', breed.id], {
      relativeTo: this.route,
    });
  }

  onDelete(breed: any) {
    this.modalService
      .openConfirmationModal('Borrar un todo', '¿Estas seguro?')
      .result.then((confirm) => {
        if (confirm) {
          this.store.dispatch(TodosActions.delete({ id: breed.id }));
          this.loading$ = this.store.pipe(select(isLoadingSelector));
        }

        this.notificationService.deletedSuccessful();
      });
  }

  addtodo() {
    this.router.navigate(['add'], {
      relativeTo: this.route,
    });
  }

  private setTableColumns() {
    this.tableColumns = [
      { label: '#', def: 'id', dataKey: 'id' },
      { label: 'Name', def: 'name', dataKey: 'name' },
      { label: 'Descripción', def: 'description', dataKey: 'description' },
    ];
  }

  private initDispatch(): void {
    this.store.dispatch(TodosActions.get());
  }

  private initSubscriptions(): void {
    this.error$ = this.store.pipe(select(errorSelector));
    this.todos$ = this.store.pipe(select(todosSelector));
  }
}
