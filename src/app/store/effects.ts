import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { TodoService } from '../todos/services/todos.service';
import { TodosActions } from './actions';
import { Todo } from '../models/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodoService) {}

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.get),
      mergeMap(() => {
        return this.todosService.getTodos().pipe(
          map((todos) => TodosActions.getSuccess({ todos })),
          catchError((error) =>
            of(TodosActions.getFailure({ error: error.message }))
          )
        );
      })
    )
  );

  getTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.getOne),
      // Filtra las acciones para quedarte solo con las que son de tipo getTodo
      mergeMap((action) => {
        return this.todosService.getTodo(action.id).pipe(
          map((todo) => {
            return TodosActions.getOneSuccess({ todo });
          }),
          catchError((error) => of(TodosActions.getFailure({ error })))
        );
      })
    )
  );

  postTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.create),
      // Filtra las acciones para quedarte solo con las que son de tipo getTodo
      mergeMap((action) => {
        return this.todosService.save(action as unknown as Todo).pipe(
          map((todo) => {
            return TodosActions.createSuccess({ todo });
          }),
          catchError((error) => of(TodosActions.createFailure({ error })))
        );
      })
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.delete),
      // Filtra las acciones para quedarte solo con las que son de tipo getTodo
      mergeMap((action) => {
        return this.todosService.delete(action.id).pipe(
          map((r) => {
            return TodosActions.deleteSuccess();
          }),
          catchError((error) => of(TodosActions.deleteFailure({ error })))
        );
      })
    )
  );
}
