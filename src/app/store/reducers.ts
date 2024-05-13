import { createReducer, on } from '@ngrx/store';
import { TodosActions } from './actions';
import { TodosStateInterface } from '../models/appState.interface';

export const initialState: TodosStateInterface = {
  isLoading: false,
  todos: [],
  error: null,
  catalogState: undefined,
  todo: {
    id: 0,
    name: '',
    description: '',
  },
};

export const reducers = createReducer(
  initialState,
  on(TodosActions.get, (state) => ({ ...state, isLoading: true })),
  on(TodosActions.getSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    todos: action.todos,
  })),
  on(TodosActions.getFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  //

  on(TodosActions.getOne, (state, { id }) => ({
    ...state,
    isLoading: true,
  })),
  on(TodosActions.getOneSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    todo: action.todo,
  })),
  on(TodosActions.getOneFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  // Delete

  on(TodosActions.delete, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((item) => item.id !== id),
    isLoadingDelte: true,
  })),

  on(TodosActions.deleteSuccess, (state, action) => ({
    ...state,
    isLoading: false,
  })),
  on(TodosActions.deleteFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(TodosActions.create, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TodosActions.createSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    // todo: action.todo,
    todos: [...state.todos],
  })),

  on(TodosActions.createFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
