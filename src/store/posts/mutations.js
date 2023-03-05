export function setPosts(state, payload) {
    state.posts = payload;
}

export function setLimit(state, payload) {
    state.limit = payload;
}

export function setTotalPosts(state, payload) {
    state.totalPosts = payload;
}

export function setError(state, payload) {
    state.isError = payload;
}
