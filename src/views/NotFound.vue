<template>
    <div class="not">
        Page not found
        <BaseButton class="black" @click="this.$router.go(-1)">Go back</BaseButton>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.not {
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
}

.black {
    background-color: #000;
}
</style>
