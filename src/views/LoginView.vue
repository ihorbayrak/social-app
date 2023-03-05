<template>
    <div class="form">
        <div class="form__wrapper">
            <h2 class="form__title">social app</h2>

            <div class="form__container">
                <BaseButton @click="signInWithGoogle">Continue with google</BaseButton>
                <BaseButton @click="signInWithFacebook"> Continue with facebook </BaseButton>
            </div>
        </div>
    </div>
</template>

<script>
import { signInWithGooglePopup, signInWithFacebookPopup } from '@/utils/firebase/firebase';
export default {
    methods: {
        async signInWithGoogle() {
            try {
                await signInWithGooglePopup();

                this.$router.push('/');
            } catch (error) {
                alert(error.message);
            }
        },
        
        async signInWithFacebook() {
            try {
                await signInWithFacebookPopup();

                this.$router.push('/');
            } catch (error) {
                alert(error.message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.form {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__wrapper {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
    }

    &__title {
        font-size: 35px;
        font-weight: 600;
        text-align: center;
        text-transform: capitalize;
    }

    &__container {
        min-height: 250px;
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
}
</style>
