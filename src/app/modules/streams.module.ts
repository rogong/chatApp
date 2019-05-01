import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StreamsComponent } from '../components/streams/streams.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { RightBarComponent } from '../components/right-bar/right-bar.component';

import { TokenService } from '../services/token.service';
import { PostService } from '../services/post.service';

@NgModule({
  declarations: [
    StreamsComponent,
    NavbarComponent,
    SidebarComponent,
    PostFormComponent,
    PostsComponent,
    RightBarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  exports: [StreamsComponent, NavbarComponent],
  providers: [TokenService, PostService]
})
export class StreamsModule { }
