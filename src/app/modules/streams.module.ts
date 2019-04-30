import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { RightBarComponent } from '../components/right-bar/right-bar.component';

@NgModule({
  declarations: [
    StreamsComponent,
    NavbarComponent,
    SidebarComponent,
    PostFormComponent,
    PostsComponent,
    RightBarComponent],
  ports: [
    CommonModule,


  ],
  exports: [StreamsComponent, NavbarComponent],
  providers: [TokenService]
})
export class StreamsModule { }
