import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from '../components/streams/streams.component';
import { AuthGuard } from '../services/auth.guard';
import { CommentsComponent } from '../components/comments/comments.component';
import { PeopleComponent } from '../components/people/people.component';
import { FollowingComponent } from '../components/following/following.component';
import { FollowerComponent } from '../components/follower/follower.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';
import { ImagesComponent } from '../components/images/images.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';

const routes: Routes = [

  {
    path: 'events',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/followers',
    component: FollowerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    component: ChatComponent,
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '*',
    redirectTo: 'events'
  }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
