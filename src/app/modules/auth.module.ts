import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthTabsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AuthTabsComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
