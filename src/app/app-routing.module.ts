import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./todos/todos.module').then((m) => m.TodosModule),
  },

  { path: '', redirectTo: 'list', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
