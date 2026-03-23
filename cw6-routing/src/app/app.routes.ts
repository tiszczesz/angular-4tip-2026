import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
    { 'path': '', 'title': 'Home', component: Home },
    { 'path': 'about', 'title': 'About', component: About },
    { 'path': 'contact', 'title': 'Contact', component: Contact },
    { 'path': '**', 'title': 'Page Not Found',component: PageNotFound },
];
