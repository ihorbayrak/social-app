<template>
    <nav class="nav">
        <ul class="nav__menu" v-if="!mobile">
            <RouterLink to="/">
                <font-awesome-icon icon="fa-solid fa-hashtag" />
            </RouterLink>

            <li>
                <RouterLink to="/">home</RouterLink>
            </li>

            <li>
                <RouterLink :to="`/profile/${currentUser?.id}`">profile</RouterLink>
            </li>

            <li @click="modalShow = true" v-if="currentUser">Create post</li>

            <li @click="signOut" v-if="currentUser">Sign Out</li>
        </ul>

        <ul class="nav__mobile" v-if="mobile">
            <li>
                <RouterLink to="/"
                    ><font-awesome-icon icon="fa-solid fa-house-chimney-window"
                /></RouterLink>
            </li>
            <li>
                <RouterLink :to="`/profile/${currentUser?.id}`"
                    ><font-awesome-icon icon="fa-solid fa-user"
                /></RouterLink>
            </li>
            <li @click="modalShow = true" v-if="currentUser">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            </li>
            <li @click="signOut" v-if="currentUser"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /></li>
        </ul>

        <AppModal v-model:show="modalShow">
            <InputField
                :handler="addPostDocument"
                :btnText="'Post'"
                :placeholderText="placeholderText"
                @send="modalShow = false"
            />
        </AppModal>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { addPostDocument, signOutUser } from '@/utils/firebase/firebase';
import InputField from './InputField.vue';

export default {
    components: {
        InputField,
    },
    data() {
        return {
            modalShow: false,
            placeholderText: "What's happening?",
            mobile: null,
            windowWidth: null,
        };
    },

    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },

    methods: {
        addPostDocument,

        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 992) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            return;
        },

        async signOut() {
            try {
                await signOutUser();

                this.$router.push('/login');
            } catch (error) {
                alert(error.message);
            }
        },
    },
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
        }),
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.nav {
    &__menu {
        margin-right: 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        font-size: 20px;

        li {
            text-transform: capitalize;
            cursor: pointer;
            a {
                font-weight: 400;
            }
            a.router-link-exact-active {
                font-weight: 700;
            }
        }
    }

    &__mobile {
        padding: 0 40px 10px 40px;

        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        width: 100%;
        height: 35px;
        justify-content: space-between;
        align-items: center;

        color: #fff;
        background-color: #000;

        z-index: 1000;
    }
}
</style>
