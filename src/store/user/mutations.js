export function setCurrentUser(state, payload) {
    state.currentUser = payload;
}

export function removeCurrentUser(state) {
    state.currentUser = null;
}
