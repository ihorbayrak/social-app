<template>
    <div class="search">
        <div class="search__container">
            <div class="search__icon">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
            <input
                class="search__input"
                type="text"
                placeholder="Search a user..."
                name="search"
                v-model="searchQuery"
            />
        </div>

        <div
            class="search__dropdown"
            :class="{ visible: findingUsers?.length || searchQuery.length }"
        >
            <ul>
                <li v-if="findingUsers?.length === 0" style="text-align: center">No results</li>

                <li
                    class="search__dropdown-item"
                    v-for="user in findingUsers"
                    :key="user.id"
                    @click="$router.push(`/profile/${user.id}`)"
                >
                    {{ user.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getUsersDocuments } from '@/utils/firebase/firebase';

export default {
    data() {
        return {
            searchQuery: '',
            usersArr: [],
        };
    },

    watch: {
        async searchQuery() {
            this.usersArr = await getUsersDocuments();
        },
    },
    
    computed: {
        findingUsers() {
            if (!this.searchQuery) return;

            return this.usersArr?.filter(
                (user) =>
                    user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.search {
    &__container {
        margin: 15px 0 15px 5px;
        padding: 10px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        border: 1px solid lightgray;
        border-radius: 10px;
    }

    &__input {
        color: #000;
        background: none;
        border: none;
        outline: none;
        width: 100%;
        &::placeholder {
            color: #000;
        }
    }

    &__icon {
        margin-right: 10px;
    }

    &__dropdown {
        margin: 15px 0 15px 5px;

        width: 100%;
        max-width: 400px;
        height: 100%;
        max-height: 250px;

        border: 1px solid #b3b3b3;
        background-color: #fff;
        border-radius: 5px;

        overflow-x: hidden;
        visibility: hidden;
        z-index: 10;
        &.visible {
            visibility: visible;
        }

        &-item {
            padding: 10px;

            width: 100%;
            max-width: 200px;
            border-bottom: 1px solid #b3b3b36b;

            cursor: pointer;

            &:hover {
                background-color: #f1f1f1d7;
            }
        }
    }
}
</style>
