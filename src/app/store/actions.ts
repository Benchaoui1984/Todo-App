// import { createAction, props } from '@ngrx/store';
// import { Todo } from '../types/todo.interface';

// export const getTodos = createAction('[Todos] Get Todos');
// export const getTodosSuccess = createAction(
//   '[Todos] Get Todos success',
//   props<{ todos: Todo[] }>()
// );
// export const getTodosFailure = createAction(
//   '[Todos] Get Todos failure',
//   props<{ error: string }>()
// );

// //Get Todo by Id
// export const getTodo = createAction('[Todo] Get Todo', props<{ id: number }>());

// export const getTodoSuccess = createAction(
//   '[Todo] Get Todo success',
//   props<{ todo: Todo }>()
// );

// export const getTodoFailure = createAction(
//   '[Todos] Get Todo failure',
//   props<{ error: string }>()
// );
// // Create

// export const postTodo = createAction('[Todo] Post Todo', props<Todo>());

// export const postTodoSuccess = createAction(
//   '[Todo] Post Todo success',
//   props<{ todo: Todo }>()
// );

// export const postTodoFailure = createAction(
//   '[Todos] Post Todo failure',
//   props<{ error: string }>()
// );

// // Delete Todo
// export const deleteTodo = createAction(
//   '[Todo] Delete Todo',
//    props<{ id: number }>()
// );

// export const deleteTodoSuccess = createAction(
//   '[Todo] Delete Todo success',
//    props<{ message: String }>()
// );

// export const deleteTodoFailure = createAction(
//   '[Todos] Delete Todo failure',
//   props<{ error: string }>()
// );

import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.interface';

// Acciones para todos
export const TodosActions = {
  // Obtener todos
  get: createAction('[Todos] Get Todos'),
  getSuccess: createAction(
    '[Todos] Get Todos Success',
    props<{ todos: Todo[] }>()
  ),
  getFailure: createAction(
    '[Todos] Get Todos Failure',
    props<{ error: string }>()
  ),

  // Obtener un todo por ID
  getOne: createAction('[Todo] Get Todo', props<{ id: number }>()),
  getOneSuccess: createAction(
    '[Todo] Get Todo Success',
    props<{ todo: Todo }>()
  ),
  getOneFailure: createAction(
    '[Todo] Get Todo Failure',
    props<{ error: string }>()
  ),

  // Crear un nuevo todo
  create: createAction('[Todo] Create Todo', props<{ todo: Todo }>()),
  createSuccess: createAction(
    '[Todo] Create Todo Success',
    props<{ todo: Todo }>()
  ),
  createFailure: createAction(
    '[Todo] Create Todo Failure',
    props<{ error: string }>()
  ),

  // Eliminar un todo por ID
  delete: createAction('[Todo] Delete Todo', props<{ id: number }>()),
  deleteSuccess: createAction('[Todo] Delete Todo Success'), // No es necesario pasar un mensaje
  deleteFailure: createAction(
    '[Todo] Delete Todo Failure',
    props<{ error: string }>()
  ),
};
