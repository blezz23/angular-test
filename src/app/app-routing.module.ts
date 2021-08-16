import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { ConverterComponent } from "./pages/converter/converter.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'currencies', component: DashboardComponent},
  {path: 'converter', component: ConverterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
