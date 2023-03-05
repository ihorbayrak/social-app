export function currentUser(state) {
    return state.currentUser;
}

export function joined(state) {
    const { joined } = state.currentUser || {};
    const month = new Date(joined).toLocaleString('en-us', { month: 'long' });
    const year = new Date(joined).getFullYear();

    return `${month} ${year}`;
}
