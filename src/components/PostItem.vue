<template>
    <li class="post">
        <img class="post__avatar" :src="post?.avatar" :alt="post?.name" />

        <div class="post__grid">
            <div
                v-if="this.currentUser?.id === this.post?.userId"
                class="post__delete"
                @click="deletePost"
            >
                x
            </div>

            <div class="post__head" @click="$router.push(`/profile/${post?.userId}`)">
                <div class="post__user">{{ post?.name }}</div>
                <div class="post__username">@{{ post?.username }}</div>
                -
                <div class="post__date">{{ moment(post?.timestamp?.toDate()).fromNow() }}</div>
            </div>

            <div class="post__body" @click="$router.push(`/feed/${post?.postId}`)">
                <div class="post__text" v-if="post?.text">{{ post?.text }}</div>
                <img class="post__media" v-if="post?.image" :src="post?.image" :alt="post?.name" />
            </div>

            <div class="post__icons">
                <div class="post__icons-comment" @click="modalShow = true">
                    <font-awesome-icon icon="fa-solid fa-comment" />
                    {{ comments.length }}
                </div>

                <div class="post__icons-like" @click="likePost" :class="{ liked: isAlreadyLiked }">
                    <font-awesome-icon icon="fa-solid fa-heart" />
                    {{ likes.length }}
                </div>
            </div>
        </div>
    </li>

    <AppModal v-model:show="modalShow">
        <InputField
            :postId="post?.postId"
            :handler="addCommentDocument"
            :btnText="'Reply'"
            :placeholderText="placeholderText"
            @send="modalShow = false"
        />
    </AppModal>
</template>

<script>
import { mapGetters } from 'vuex';
import {
    addLikeToPost,
    removeLikeFromPost,
    db,
    deletePostDocument,
    deleteMediaFromStorage,
    addCommentDocument,
} from '@/utils/firebase/firebase';
import { collection, onSnapshot } from '@firebase/firestore';

import moment from 'moment';
import InputField from './InputField.vue';

export default {
    props: {
        post: {
            type: Object,
        },
    },

    components: { InputField },

    data() {
        return {
            likes: [],
            comments: [],
            moment: moment,
            modalShow: false,
            placeholderText: 'Share your reply!',
        };
    },

    methods: {
        addCommentDocument,
        getLikes(postId) {
            const collectionRef = collection(db, 'posts', postId, 'likes');

            onSnapshot(collectionRef, (snapshot) => {
                this.likes = snapshot.docs.map((v) => v.data());
            });
        },

        getComments(postId) {
            const collectionRef = collection(db, 'posts', postId, 'comments');

            onSnapshot(collectionRef, (snapshot) => {
                this.comments = snapshot.docs.map((v) => v.data());
            });
        },

        likePost() {
            if (this.isAlreadyLiked) {
                removeLikeFromPost(this.currentUser, this.post?.postId);
            } else {
                addLikeToPost(this.currentUser, this.post?.postId);
            }
        },
        deletePost() {
            removeLikeFromPost(this.currentUser, this.post?.postId);
            deletePostDocument(this.post?.postId);
            if (this.post.image) {
                deleteMediaFromStorage(this.post?.postId);
            }
            if (this.$route.name === 'post') {
                this.$router.push('/');
            }
        },
    },

    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
        }),
        isAlreadyLiked() {
            return this.likes.findIndex((like) => like.userId === this.currentUser?.id) !== -1;
        },
    },

    watch: {
        post() {
            this.getLikes(this.post?.postId);
        },
    },
    
    mounted() {
        this.getLikes(this.post?.postId);
        this.getComments(this.post?.postId);
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.post {
    padding: 10px 15px;
    display: grid;
    column-gap: 15px;
    grid-template-columns: 50px minmax(0, 1fr);
    border: 1px solid lightgray;

    &__grid {
        position: relative;
    }

    &__head {
        display: flex;
        align-items: center;
        gap: 8px;

        cursor: pointer;
    }

    &__user {
        font-size: 18px;
        text-transform: capitalize;
        font-weight: 700;
    }

    &__username {
        font-weight: 300;
        color: $second-color;
    }

    &__date {
        font-weight: 300;
        color: $second-color;
    }

    &__avatar {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    &__body {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        cursor: pointer;
    }

    &__media {
        margin-top: 8px;
        max-height: 500px;
        max-width: 100%;
        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }

    &__icons {
        margin-top: 15px;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        color: gray;

        cursor: pointer;
        user-select: none;
        & .liked {
            color: red;
        }
    }

    &__delete {
        position: absolute;
        top: 0;
        right: 0;

        color: red;
        font-size: 18px;

        cursor: pointer;
        user-select: none;
    }
}
</style>
