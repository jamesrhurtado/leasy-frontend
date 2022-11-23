<script setup>
import Header from '@/components/header.component.vue'
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth.store.js';
import Footer from '@/components/footer.component.vue'

const UserStore = useAuthStore()
const auth = computed(() => UserStore.user)
</script>

<template>
    <Header />
    <div class="grid shadow-md w-96 m-auto my-3 mt-28 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Mi perfil
        </div>
        <q-input class="p-4 m-2" outlined v-model="auth.user.name" hint="Nombre" readonly />
        <q-input class="p-4 m-2" outlined v-model="auth.user.lastName" hint="Apellidos" readonly />
        <q-input class="p-4 m-2 mb-6" outlined v-model="auth.user.email" hint="Correo Electronico" readonly />
    </div>
    <Footer />
</template>

<style>

</style>