<script setup>
import { ref } from 'vue'

const password = ref('')
const isPwd =  ref(true)
const email = ref('')

</script>

<template>
    <div class="grid grid-cols-1 grid-rows-3 shadow-md w-96 m-0 m-auto mt-6">
        <div class="heading heading-color font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Iniciar Sesión
        </div>
        <div class="form p-3">
            <q-input class="p-3" outlined v-model="text" label="Correo electronico" />
            <q-input class="p-3" outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña">
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
        </div>
        <div class="sign-in_btn text-center self-center ">
            <q-btn color="secondary" label="Iniciar Sesión" />
        </div>
        <div class="additional-actions">
            <div>No tiene una cuenta?</div>
            <div>Registrarse</div>
        </div>
    </div>
</template>

<style>
</style>