import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { MarsuComponent } from './components/marsu/marsu.component';
import { MarsuDetailsComponent } from './components/marsu/marsu-details/marsu-details.component';
import { FriendsListComponent } from './components/marsu/friends-list/friends-list.component';
import { FriendsListItemComponent } from './components/marsu/friends-list/friends-list-item/friends-list-item.component';
import { LogoutComponent } from './components/marsu/logout/logout.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MarsuService } from './services/marsu.service';
import { CreateFriendComponent } from './components/marsu/create-friend/create-friend.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterLoginComponent,
    MarsuComponent,
    MarsuDetailsComponent,
    FriendsListComponent,
    FriendsListItemComponent,
    LogoutComponent,
    FourOhFourComponent,
    CreateFriendComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService, 
    AuthGuardService, 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    MarsuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
