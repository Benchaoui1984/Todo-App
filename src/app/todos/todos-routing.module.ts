import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosListComponent } from './components/list/todos-list.component';
import { TodoDetailComponenet } from './components/detail/todo-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TodosListComponent,
  },
  {
    path: 'add',
    component: TodoDetailComponenet,
    data: {
      mode: 'create',
    },
  },
  {
    path: 'view/:id', // Usar 'view/:id' para ver un TODO existente
    component: TodoDetailComponenet,
    data: {
      mode: 'view',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
