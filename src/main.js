import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/UI';
import directives from '@/directives';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faHashtag,
    faHouseChimneyWindow,
    faUser,
    faMagnifyingGlass,
    faPhotoFilm,
    faHeart,
    faComment,
    faPenToSquare,
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

library.add(
    faHashtag,
    faHouseChimneyWindow,
    faUser,
    faMagnifyingGlass,
    faPhotoFilm,
    faHeart,
    faComment,
    faPenToSquare,
    faArrowRightFromBracket
);

components.forEach((component) => {
    app.component(component.name, component);
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app.component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app');
