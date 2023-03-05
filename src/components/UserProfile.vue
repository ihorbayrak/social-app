<template>
    <div class="profile">
        <div class="profile__head">
            <img class="profile__avatar" :src="user?.avatar" :alt="user?.username" />
        </div>
        <div class="profile__user">{{ user?.name }}</div>
        <div class="profile__username">@{{ user?.username }}</div>

        <div class="profile__joined">joined {{ joined }}</div>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
        },
    },
    
    computed: {
        joined() {
            const joined = this.user?.joined.toDate().toDateString();
            const month = new Date(joined).toLocaleString('en-us', { month: 'long' });
            const year = new Date(joined).getFullYear();

            return `${month} ${year}`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile {
    margin-top: 15px;
    padding: 15px;
    border: 1px solid lightgray;

    &__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #000;
    }

    &__user {
        margin-top: 10px;
        font-weight: 700;
        font-size: 22px;
    }

    &__username {
        margin-bottom: 10px;
        font-weight: 300;
        color: $second-color;
    }

    &__joined {
        margin-top: 5px;
        font-weight: 700;
        color: $second-color;
        text-transform: capitalize;
    }
}
</style>
