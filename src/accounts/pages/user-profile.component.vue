<script setup>
import Header from '@/components/header.component.vue'
import { useAuthStore } from '../../stores/auth.store.js';
const UserStore = useAuthStore()
const user = UserStore.user
</script>


<template>
    <Header />
    <div class="grid shadow-md w-96 m-auto my-3 mt-28 font-dm-sans-regular">
            <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
                Mi perfil
            </div>
            <q-input class="p-4 m-2" outlined v-model="user.name" hint="Nombre" :dense="dense" readonly />
            <q-input class="p-4 m-2" outlined v-model="user.lastName" hint="Apellidos" :dense="dense" readonly />
            <q-input class="p-4 m-2 mb-6" outlined v-model="user.email" hint="Correo Electronico" :dense="dense" readonly />
        </div>
</template>

<style>

</style>