import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { PageNotFound } from './page-not-found/page-not-found';
import { FormUsers } from './form-users/form-users';

export const routes: Routes = [
    { 'path': '', 'title': 'Home', component: Home },
    { 'path': 'about', 'title': 'About', component: About },
    { 'path': 'contact', 'title': 'Contact', component: Contact },
    { 'path': 'users', 'title': 'Users', component: FormUsers },
    { 'path': '**', 'title': 'Page Not Found',component: PageNotFound },
];
