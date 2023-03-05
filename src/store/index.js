import { createStore } from 'vuex';

import user from './user';
import posts from './posts';

export default createStore({
    modules: {
        user,
        posts,
    },
});
