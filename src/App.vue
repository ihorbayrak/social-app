<template>
    <div class="container">
        <AppNavigation />
        <main>
            <router-view />
        </main>
        <SearchBar />
    </div>
</template>

<script>
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase';

import AppNavigation from '@/components/AppNavigation.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
    components: { AppNavigation, SearchBar },

    created() {
        onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);

                this.$store.dispatch('user/handleCurrentUser', user.uid);
                localStorage.setItem('loggedIn', true);
            }

            if (!user) {
                this.$store.commit('user/removeCurrentUser');
                localStorage.setItem('loggedIn', false);
            }
        });
    },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&display=swap');

@import '@/styles/variables.scss';

* {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

body {
    background-color: #fbfaf5;
}

.container {
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1240px) {
        max-width: 900px;
    }

    @media screen and (max-width: 900px) {
        max-width: 740px;
    }

    @media screen and (max-width: 768px) {
        padding: 0 10px;
    }
}

main {
    flex: 1;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
    height: 100vh;
}

ul,
li,
dl {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
}

a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
    &:hover {
        text-decoration: none;
        color: inherit;
    }
}

p {
    margin: 0;
    padding: 0;
}
</style>
