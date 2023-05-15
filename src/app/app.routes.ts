import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'test',
    loadComponent: () => import('./test/test.page').then( m => m.TestPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'test-result',
    loadComponent: () => import('./test-result/test-result.page').then( m => m.TestResultPage)
  },
  {
    path: 'registration',
    loadComponent: () => import('./registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: 'answers',
    loadComponent: () => import('./answers/answers.page').then( m => m.AnswersPage)
  },
  {
    path: 'congratulation',
    loadComponent: () => import('./congratulation/congratulation.page').then( m => m.CongratulationPage)
  },
  {
    path: 'login-menu',
    loadComponent: () => import('./login-menu/login-menu.page').then( m => m.LoginMenuPage)
  },
];
