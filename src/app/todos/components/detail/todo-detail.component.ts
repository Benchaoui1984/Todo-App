import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable, Subject, filter, merge, takeUntil, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { Todo } from '../../../models/todo.interface';
import { LoadingService } from '../../../services/loading.service';
import { AppStateInterface } from '../../../models/appState.interface';
import {
  errorSelectorTodo,
  isLoadingSelectorTodo,
  todoSelector,
} from '../../../store/selectors';
import { TodosActions } from '../../../store/actions';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-detail',
  standalone: false,
  // imports: [
  //   MatDialogModule,
  //   ReactiveFormsModule,
  //   MatInputModule,
  //   MatFormFieldModule, // Asegúrate de importar MatFormFieldModule aquí
  // ],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponenet {
  breedName!: any;
  breedImage!: string;
  title!: string;
  id: any;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  todo$!: Observable<any>;
  form: FormGroup = new FormGroup({});

  private destroySubject = new Subject<void>();
  mode: 'create' | 'view';
  hicham$!: Observable<Todo>;

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.data['mode'];
  }

  ngOnInit(): void {
    this.title =
      this.mode === 'view' ? 'Consulta de todo' : 'Creación de un todo';
    this.form.reset();
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.isLoading$ = this.store.pipe(select(isLoadingSelectorTodo));
    this.error$ = this.store.pipe(select(errorSelectorTodo));
    this.todo$ = this.store.pipe(select(todoSelector));

    // Punto de suscripción
    merge(this.setForm()).pipe(takeUntil(this.destroySubject)).subscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí puedes enviar el formulario
      const hicham = this.form.value;
      this.store.dispatch(TodosActions.create(hicham));

      this.notificationService.createdSuccessful();

      this.router.navigate(['/list']);
    } else {
      // Marca los campos inválidos
      this.form.markAllAsTouched();
    }
  }

  onBack() {
    this.router.navigate(['/list']);
  }

  private setForm(): Observable<any> {
    return this.todo$.pipe(
      filter((item) => !!item),

      tap((dataForm) => {
        if (this.mode == 'view') {
          this.form.disable();

          this.form.patchValue(dataForm);
        } else {
          this.form.reset();
        }
      })
    );
  }

  Saveuser() {}
}
