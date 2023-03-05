<template>
    <div>
        <PostItem v-if="post" :post="post" />
        <InputField
            :postId="$route.params.postId"
            :handler="addCommentDocument"
            :btnText="'Reply'"
            :placeholderText="placeholderText"
        />

        <ul v-if="comments.length > 0">
            <CommentItem v-for="comment in comments" :comment="comment" :key="comment.commentId" />
        </ul>
    </div>
</template>

<script>
import { addCommentDocument, db, getPostDocument } from '@/utils/firebase/firebase';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';

import PostItem from '@/components/PostItem.vue';
import InputField from '@/components/InputField.vue';
import CommentItem from '@/components/CommentItem.vue';

export default {
    components: { InputField, CommentItem, PostItem },
    data() {
        return {
            comments: [],
            post: null,
            placeholderText: 'Share your reply!',
        };
    },

    methods: {
        addCommentDocument,

        getComments(postId) {
            const collectionRef = collection(db, 'posts', postId, 'comments');

            onSnapshot(query(collectionRef, orderBy('timestamp', 'desc')), (snapshot) => {
                this.comments = snapshot.docs.map((v) => {
                    return { commentId: v.id, ...v.data() };
                });
            });
        },

        async getPost(postId) {
            const post = await getPostDocument(postId);

            this.post = { ...post, postId: this.$route.params.postId };
        },
    },
    mounted() {
        this.getPost(this.$route.params.postId);
        this.getComments(this.$route.params.postId);
    },
};
</script>

<style lang="scss" scoped></style>
