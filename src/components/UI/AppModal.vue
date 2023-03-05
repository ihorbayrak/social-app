<template>
    <div class="modal" v-if="show" @click.stop="hideDialog">
        <div @click.stop class="modal__content">
            <div class="modal__close" @click="hideDialog">x</div>

            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
    name: 'AppModal',
    mixins: [toggleMixin],
};
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);

    transition: 0.5s all;

    z-index: 100;

    &__content {
        padding: 30px 0;

        position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
        background: #fff;

        min-height: 250px;
        width: 30vw;

        transition: 0.5s all;
    }

    &__close {
        position: absolute;
        top: 5px;
        right: 10px;

        font-size: 20px;
        font-weight: 700;
        color: #9c9b9b;

        cursor: pointer;
    }
}
</style>
