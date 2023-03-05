<template>
    <div class="field">
        <img class="field__avatar" :src="currentUser?.avatar" :alt="currentUser?.name" />

        <div class="field__wrapper">
            <div class="field__area">
                <textarea
                    v-model="text"
                    name="inputField"
                    rows="2"
                    :placeholder="placeholderText"
                ></textarea>
                <div
                    v-if="text.length"
                    :style="{ color: text.length >= textLimit ? 'red' : 'inherit' }"
                >
                    {{ `${text.length} / ${textLimit} ` }}
                </div>

                <div class="field__media" v-if="selectedFile">
                    <div class="field__delete" v-if="selectedFile" @click="selectedFile = null">
                        x
                    </div>
                    <img :src="selectedFile" alt="upload" />
                </div>
            </div>

            <div class="field__widgets">
                <div class="field__upload" @click="() => this.$refs.upload.click()">
                    <input type="file" ref="upload" @change="uploadMedia" accept="image/*" />

                    <font-awesome-icon icon="fa-solid fa-photo-film" />
                </div>

                <BaseButton @click="createNewComponent">
                    <div>{{ btnText }}</div>
                </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        handler: {
            type: Function,
        },
        btnText: {
            type: String,
        },
        placeholderText: {
            type: String,
        },
        postId: {
            type: String,
        },
    },

    data() {
        return {
            textLimit: 200,
            text: '',
            selectedFile: null,
        };
    },

    methods: {
        uploadMedia(e) {
            const reader = new FileReader();

            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }

            reader.onload = (event) => {
                this.selectedFile = event.target.result;
            };
        },

        createNewComponent() {
            if (this.text.length >= this.textLimit) return;

            const obj = {
                userId: this.currentUser.id,
                name: this.currentUser.name,
                username: this.currentUser.username,
                text: this.text,
                avatar: this.currentUser.avatar,
            };

            this.handler(obj, this.postId, this.selectedFile);

            this.text = '';
            this.selectedFile = null;
            this.$emit('send'); // hide modal
        },
    },

    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser',
        }),
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.field {
    width: 100%;
    min-height: 150px;
    padding: 5px 10px;
    display: grid;
    grid-template-columns: 50px 1fr;
    column-gap: 10px;
    border: 1px solid lightgray;

    &__avatar {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }

    &__area {
        textarea {
            font-size: 20px;
            padding: 10px;
            resize: none;
            outline: none;
            border: none;
            background-color: transparent;
            width: 100%;
        }
    }

    &__widgets {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
            max-width: 100px;
        }
    }

    &__media {
        position: relative;
        width: 100%;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &__delete {
        position: absolute;
        top: 0;
        right: 0;

        font-size: 20px;
        font-weight: 700;
        color: #9c9b9b;

        cursor: pointer;
    }

    &__upload {
        cursor: pointer;

        color: $main-color;

        input {
            display: none;
        }
    }
}
</style>
