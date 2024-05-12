import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from '../shared/table/table.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { TodosListComponent } from './components/list/todos-list.component';
import { TodoDetailComponenet } from './components/detail/todo-detail.component';

@NgModule({
  declarations: [TodosListComponent, TodoDetailComponenet],
  imports: [
    CommonModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    TableModule,
    HttpClientModule,
    MatCardModule,
  ],
})
export class TodosModule {}
