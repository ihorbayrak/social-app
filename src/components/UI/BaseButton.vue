<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.btn {
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    border: none;
    border-radius: 40px;
    background-color: $main-color;

    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;

    transition: 0.2s all;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
}
</style>
