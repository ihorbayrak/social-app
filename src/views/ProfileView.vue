<template>
    <section class="user">
        <h2 class="user__title">
            <span @click="$router.go(-1)" class="user__arrow">&#10141;</span>

            {{ profileUser?.name }}
        </h2>

        <UserProfile :user="profileUser" />
        <PostList />
    </section>
</template>

<script>
import { getUserDocument } from '@/utils/firebase/firebase';
import PostList from '@/components/PostList.vue';
import UserProfile from '@/components/UserProfile.vue';

export default {
    components: {
        UserProfile,
        PostList,
    },
    data() {
        return {
            profileUser: null,
        };
    },

    watch: {
        async $route() {
            this.profileUser = await getUserDocument(this.$route.params.userId);
        },
    },

    async mounted() {
        this.profileUser = await getUserDocument(this.$route.params.userId);
    },
};
</script>

<style lang="scss" scoped>
.user__arrow {
    display: inline-block;
    transform: scale(-1, 1);
    cursor: pointer;
}
</style>
