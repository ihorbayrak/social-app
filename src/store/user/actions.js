import { getUserDocument } from '@/utils/firebase/firebase';

export async function handleCurrentUser({ commit }, userId) {
    const user = await getUserDocument(userId);

    commit('setCurrentUser', user);
}
