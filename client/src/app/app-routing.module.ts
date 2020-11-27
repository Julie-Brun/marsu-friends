import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { MarsuComponent } from './components/marsu/marsu.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: RegisterLoginComponent },
  { path: 'auth', component: RegisterLoginComponent },
  { path: 'profile/:id', canActivate: [AuthGuardService], component: MarsuComponent },
  { path: '404', component: FourOhFourComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
