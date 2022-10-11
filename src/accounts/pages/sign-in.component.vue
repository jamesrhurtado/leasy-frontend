<script setup>
import { ref } from 'vue'

const password = ref('')
const isPwd =  ref(true)
const email = ref('')

</script>

<template>
    <div class="grid grid-cols-1 grid-rows-3 shadow-md w-96 h-auto m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Iniciar Sesión
        </div>
        <div class="form p-3">
            <q-input class="p-2" outlined v-model="text" label="Correo electronico" />
            <q-input class="p-2" outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Contraseña">
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
        </div>
        <div class="sign-in_btn text-center">
            <q-btn color="secondary" label="Iniciar Sesión" />
        </div>
        <div class="additional-actions text-center my-3">
            <div class="font-dm-sans-regular">No tiene una cuenta?</div>
            <RouterLink to="/signup" class="underline font-dm-sans-bold text-a">
          REGISTRARSE
        </RouterLink>
        </div>
    </div>
</template>
<style>

.text-a{
    color: var(--color-text-a)
}
</style>