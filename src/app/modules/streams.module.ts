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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule

  ],
  exports: [StreamsComponent, NavbarComponent],
  providers: [TokenService, PostService, AlertifyService, UsersService]
})
export class StreamsModule { }
