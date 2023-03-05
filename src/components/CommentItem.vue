<template>
    <li class="comment">
        <img class="comment__avatar" :src="comment?.avatar" :alt="comment?.name" />

        <div class="comment__grid">
            <div class="comment__head" @click="$router.push(`/profile/${comment?.userId}`)">
                <div class="comment__user">{{ comment?.name }}</div>
                <div class="comment__username">@{{ comment?.username }}</div>
                -
                <div class="comment__date">
                    {{ moment(comment?.timestamp?.toDate()).fromNow() }}
                </div>
            </div>

            <div class="comment__body">
                <div class="comment__text" v-if="comment?.text">
                    {{ comment?.text }}
                </div>

                <img
                    class="comment__media"
                    v-if="comment?.image"
                    :src="comment?.image"
                    :alt="comment?.name"
                />
            </div>

            <div class="comment__icons">
                <div
                    class="comment__icons-like"
                    @click="likeComment"
                    :class="{ liked: isAlreadyLiked }"
                >
                    <font-awesome-icon icon="fa-solid fa-heart" />
                    {{ commentLikes.length }}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapGetters } from 'vuex';
import { addLikeToComment, removeLikeFromComment, db } from '@/utils/firebase/firebase';
import { collection, onSnapshot } from '@firebase/firestore';

import moment from 'moment';

export default {
    props: {
        comment: {
            type: Object,
        },
    },

    data() {
        return {
            commentLikes: [],
            moment: moment,
        };
    },

    methods: {
        getLikes(postId, commentId) {
            const collectionRef = collection(db, 'posts', postId, 'comments', commentId, 'likes');

            onSnapshot(collectionRef, (snapshot) => {
                this.commentLikes = snapshot.docs.map((v) => v.data());
            });
        },

        likeComment() {
            if (this.isAlreadyLiked) {
                removeLikeFromComment(
                    this.currentUser,
                    this.$route.params.postId,
                    this.comment?.commentId
                );
            } else {
                addLikeToComment(
                    this.currentUser,
                    this.$route.params.postId,
                    this.comment?.commentId
                );
            }
        },
    },

    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
        }),

        isAlreadyLiked() {
            return (
                this.commentLikes.findIndex((like) => like.userId === this.currentUser?.id) !== -1
            );
        },
    },

    watch: {
        comment() {
            this.getLikes(this.$route.params.postId, this.comment?.commentId);
        },
    },
    
    mounted() {
        this.getLikes(this.$route.params.postId, this.comment?.commentId);
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.comment {
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
    }

    &__media {
        margin-top: 8px;
        max-height: 300px;
        max-width: 100%;
        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }

    &__icons {
        margin-top: 15px;
        width: 400px;
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
