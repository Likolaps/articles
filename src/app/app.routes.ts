import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ArticleService } from '../services/article.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../View/home/home.component').then((m) => m.HomeComponent),
    resolve: {
      article: () => inject(ArticleService).all(),
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../View/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../View/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'article',
    loadComponent: () =>
      import('../View/list/list.component').then((m) => m.ListComponent),
    resolve: {
      articles: () => inject(ArticleService).all(),
    },
  },
  {
    path: 'article/:id',
    loadComponent: () =>
      import('../View/article-editor/article-editor.component').then(
        (m) => m.ArticleEditorComponent
      ),
    resolve: {
      article: (route: ActivatedRouteSnapshot) =>
        inject(ArticleService).byId(route.params['id']),
    },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
