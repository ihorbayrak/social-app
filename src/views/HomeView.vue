<template>
    <section class="home">
        <h2 class="home__title">home</h2>

        <InputField :handler="addPostDocument" :btnText="'Post'" :placeholderText="placeholderText" />
        <PostList />
    </section>
</template>

<script>
import { addPostDocument } from '@/utils/firebase/firebase';

import InputField from '@/components/InputField.vue';
import PostList from '@/components/PostList.vue';

export default {
    components: {
        InputField,
        PostList,
    },
    methods: {
        addPostDocument,
    },

    data() {
        return {
            placeholderText: "What's happening?",
        };
    },
};
</script>

<style lang="scss" scoped>
.home {
    &__title {
        margin: 15px 0 15px 5px;
        font-weight: 700;
        text-transform: capitalize;
    }
}
</style>
