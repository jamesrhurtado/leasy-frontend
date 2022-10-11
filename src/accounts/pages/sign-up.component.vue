<script setup>
import { ref } from 'vue'

const name = ref('')
const lastName = ref('')
const email = ref('')
const password =  ref('')
const confirmPassword =  ref('')
const isPwd = ref(true)

</script>

<template>
    <div class="grid grid-cols-1 grid-rows-3 shadow-md w-96 m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Registrarse
        </div>
        <div class="form p-3">
            <q-input class="p-2" outlined v-model="text" label="Nombres" />
            <q-input class="p-2" outlined v-model="text" label="Apellidos" />
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
            <q-input class="p-2" outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Confirmar contraseña">
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
            <q-btn color="secondary" label="Registrarse" />
        </div>
        <div class="additional-actions text-center my-3">
            <div class="font-dm-sans-regular">Ya tiene una cuenta?</div>
            <RouterLink to="/sign-in" class="underline font-dm-sans-bold text-a">
          INICIAR SESION
        </RouterLink>
        </div>
    </div>
</template>
<style>

.text-a{
    color: var(--color-text-a)
}

</style>