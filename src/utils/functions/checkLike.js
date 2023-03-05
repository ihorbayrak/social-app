export function checkLike(likes, user) {
    return likes.some((like) => like.userId === user?.id);
}
// this.likes.findIndex((like) => like.userId === this.user?.id) !== -1;