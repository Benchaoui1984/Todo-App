import { Todo } from './todo.interface';

export interface AppStateInterface {
  todos: TodosStateInterface;
}

export interface TodosStateInterface {
  catalogState?: any;
  isLoading: boolean;
  todos: Todo[];
  todo: Todo;
  error: string | null;
}
