import { db } from '@/utils/firebase/firebase';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';

export function getPosts({ state, commit }) {
    try {
        commit('setLimit', 5);
        commit('setError', false);

        const collectionRef = collection(db, 'posts');

        onSnapshot(
            query(collectionRef, orderBy('timestamp', 'desc'), limit(state.limit)),
            (snapshot) => {
                const arr = snapshot.docs.map((v) => {
                    return { postId: v.id, ...v.data() };
                });

                commit('setTotalPosts', arr.length);
                commit('setPosts', arr);
            }
        );
    } catch (error) {
        commit('setError', true);
    }
}

export function getPostsByScrolling({ state, commit }) {
    if (state.posts.length === 0 || state.limit > state.totalPosts) return;

    try {
        commit('setLimit', state.limit + 5);
        commit('setError', false);

        const collectionRef = collection(db, 'posts');

        onSnapshot(
            query(collectionRef, orderBy('timestamp', 'desc'), limit(state.limit)),
            (snapshot) => {
                const arr = snapshot.docs.map((v) => {
                    return { postId: v.id, ...v.data() };
                });

                commit('setTotalPosts', arr.length);
                commit('setPosts', arr);
            }
        );
    } catch (error) {
        commit('setError', true);
    }
}

export function getPostsWithId({ state, commit }, profileId) {
    if (!profileId) return;

    try {
        commit('setLimit', 5);
        commit('setError', false);

        const collectionRef = collection(db, 'posts');

        onSnapshot(
            query(
                collectionRef,
                where('userId', '==', profileId),
                orderBy('timestamp', 'desc'),
                limit(state.limit)
            ),
            (snapshot) => {
                const arr = snapshot.docs.map((v) => {
                    return { postId: v.id, ...v.data() };
                });

                commit('setTotalPosts', arr.length);
                commit('setPosts', arr);
            }
        );
    } catch (error) {
        commit('setError', true);
    }
}

export function getPostsByScrollingWithId({ state, commit }, profileId) {
    if (!profileId) return;

    if (state.posts.length === 0 || state.limit > state.totalPosts) return;

    try {
        commit('setLimit', state.limit + 5);
        commit('setError', false);

        const collectionRef = collection(db, 'posts');

        onSnapshot(
            query(
                collectionRef,
                where('userId', '==', profileId),
                orderBy('timestamp', 'desc'),
                limit(state.limit)
            ),
            (snapshot) => {
                const arr = snapshot.docs.map((v) => {
                    return { postId: v.id, ...v.data() };
                });

                commit('setTotalPosts', arr.length);
                commit('setPosts', arr);
            }
        );
    } catch (error) {
        commit('setError', true)
    }
}
