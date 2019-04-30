import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
  declarations: [StreamsComponent, NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,


  ],
  exports: [StreamsComponent, NavbarComponent],
  providers: [TokenService]
})
export class StreamsModule { }
