import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '../models/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.todos;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const todosSelector = createSelector(
  selectFeature,
  (state) => state.todos
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

//

export const selectTodoById = (todoId: number) =>
  createSelector(selectFeature, (state) =>
    state.todos.find((item) => item.id === todoId)
  );

//

export const isLoadingSelectorTodo = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const todoSelector = createSelector(
  selectFeature,
  (state) => state?.todo
);

export const errorSelectorTodo = createSelector(
  selectFeature,
  (state) => state.error
);

export const deleteTodoSelector = createSelector(
  selectFeature,
  (state) => state.todos
);
