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
import { CommentsComponent } from '../components/comments/comments.component';
import { AlertifyService } from '../services/alertify.service';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowerComponent } from '../components/follower/follower.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { ImagesComponent } from '../components/images/images.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';

@NgModule({
  declarations: [
    StreamsComponent,
    NavbarComponent,
    SidebarComponent,
    PostFormComponent,
    PostsComponent,
    RightBarComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowerComponent,
    NotificationsComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent,
    ViewUserComponent,
    FooterComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule

  ],
  exports: [StreamsComponent, NavbarComponent],
  providers: [
    TokenService,
    PostService,
    AlertifyService,
    UsersService,
    MessageService
  ]
})
export class StreamsModule { }
