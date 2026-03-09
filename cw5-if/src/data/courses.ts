export type Course = {
    id: number;
    title: string;
    description: string;
    count: number; // number of students currently enrolled
    limit: number; // number of students that can enroll
    level: 'początkujący' | 'średniozaawansowany' | 'zaawansowany';
};
export const levels = ['początkujący', 'średniozaawansowany', 'zaawansowany'];
export const courses: Course[] = [
    {
        id: 1,
        title: 'Wprowadzenie do TypeScript',
        description: 'Naucz się podstaw TypeScript i typowania statycznego.',
        count: 24,
        limit: 30,
        level: 'początkujący',
    },
    {
        id: 2,
        title: 'Angular dla początkujących',
        description: 'Kompletny kurs Angular od zera do první aplikacji.',
        count: 25,
        limit: 25,
        level: 'początkujący',
    },
    {
        id: 3,
        title: 'Zaawansowana zarządzanie stanem w Angular',
        description: 'Naucz się sygnałów i zaawansowanych technik zarządzania stanem.',
        count: 15,
        limit: 20,
        level: 'zaawansowany',
    },
    {
        id: 4,
        title: 'Reactive Forms w Angular',
        description: 'Praktyczny kurs budowania skomplikowanych formularzy reaktywnych.',
        count: 22,
        limit: 28,
        level: 'średniozaawansowany',
    },
    {
        id: 5,
        title: 'Dostępność web (a11y)',
        description: 'Uczymy się pisać aplikacje dostępne dla wszystkich użytkowników.',
        count: 12,
        limit: 20,
        level: 'średniozaawansowany',
    },
    {
        id: 6,
        title: 'Performance i optymalizacja Angular',
        description: 'Techniki poprawy wydajności aplikacji Angular.',
        count: 8,
        limit: 15,
        level: 'zaawansowany',
    },
    {
        id: 7,
        title: 'RxJS i Observables',
        description: 'Mistrzostwo w programowaniu reaktywnym z RxJS.',
        count: 20,
        limit: 25,
        level: 'średniozaawansowany',
    },
    {
        id: 8,
        title: 'Testing w Angular',
        description: 'Jednostkowe i integracyjne testy aplikacji Angular.',
        count: 14,
        limit: 22,
        level: 'średniozaawansowany',
    },
    {
        id: 9,
        title: 'CSS Grid i Flexbox',
        description: 'Nowoczesne layouty CSS dla responsywnych aplikacji.',
        count: 26,
        limit: 32,
        level: 'początkujący',
    },
    {
        id: 10,
        title: 'Mikrofrontends i module federation',
        description: 'Architektura mikrofrontendów w dużych aplikacjach.',
        count: 6,
        limit: 12,
        level: 'zaawansowany',
    }
];    