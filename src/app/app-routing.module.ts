import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calculo10pComponent } from '../app/components/calculo10p/calculo10p.component';

const routes: Routes = [
   { path: '', component: Calculo10pComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
