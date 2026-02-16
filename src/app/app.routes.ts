import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ReactiveForm } from './reactive-form/reactive-form';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'reactive-form-poc', component: ReactiveForm },
    { path: '**', redirectTo: '' }
];
