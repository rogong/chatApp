import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { StreamsModule } from './streams.module';
import { StreamsRoutingModule } from './streams-routing.module';

@NgModule({
  declarations: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StreamsModule,
    StreamsRoutingModule
  ],
  exports: [
    AuthTabsComponent,
    LoginComponent,
    SignupComponent,
  ],
  providers: [AuthService]
})
export class AuthModule { }
