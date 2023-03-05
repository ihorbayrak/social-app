<template>
    <ul class="post__list">
        <div v-if="isError">Error...</div>
        <PostItem v-for="post in posts" :key="post.postId" :post="post" />
    </ul>

    <div
        v-if="this.$route.name === 'home'"
        v-intersection="getPostsByScrolling"
        class="observer"
    ></div>

    <div
        v-if="this.$route.name === 'profile'"
        v-intersection="paginateByScroll"
        class="observer"
    ></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import PostItem from './PostItem.vue';

export default {
    components: {
        PostItem,
    },

    methods: {
        ...mapActions({
            getPosts: 'posts/getPosts',
            getPostsWithId: 'posts/getPostsWithId',
            getPostsByScrolling: 'posts/getPostsByScrolling',
            getPostsByScrollingWithId: 'posts/getPostsByScrollingWithId',
        }),
        paginateByScroll() {
            this.getPostsByScrollingWithId(this.$route.params.userId);
        },
    },

    computed: {
        ...mapGetters({
            posts: 'posts/posts',
            isError: 'posts/isError',
        }),
    },

    watch: {
        $route() {
            switch (this.$route.name) {
                case 'home':
                    this.getPosts();
                    break;
                case 'profile':
                    this.getPostsWithId(this.$route.params.userId);
                    break;
                default:
                    return;
            }
        },
    },

    mounted() {
        switch (this.$route.name) {
            case 'home':
                this.getPosts();
                break;
            case 'profile':
                this.getPostsWithId(this.$route.params.userId);
                break;
            default:
                return;
        }
    },
};
</script>

<style lang="scss" scoped>
.observer {
    height: 30px;
}
</style>
