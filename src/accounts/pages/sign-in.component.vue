<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const email = ref(null)
    const emailRef = ref(null)

    const password = ref(null)
    const passwordRef = ref(null)
    const isPwd = ref(true)

    return {
        email,
        emailRef,
        emailRules: [
            val => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) || 'Por favor, ingrese un correo valido'
        ],

        password,
        passwordRef,
        passwordRules: [
            val => (val && val.length > 0) || 'Este campo es obligatorio'
        ],

        isPwd,

      onSubmit () {
        emailRef.value.validate()
        passwordRef.value.validate()

        if (emailRef.value.hasError || passwordRef.value.hasError) {
            $q.notify({
            color: 'negative',
            message: 'No se pudo ingresar. Verifique sus datos.',
            actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]  
          })
        }
      },
    }
  }
}

</script>

<template>
    <div class="grid shadow-md w-96 h-auto m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Iniciar Sesión
        </div>
        <form @submit.prevent.stop="onSubmit" class="p-3">
            <q-input 
            ref = "emailRef"
            class="p-2" 
            outlined 
            v-model="email" 
            label="Correo electronico" 
            :rules="emailRules"
            />
            <q-input 
            ref = "passwordRef"
            class="p-2" 
            outlined 
            v-model="password" 
            :type="isPwd ? 'password' : 'text'" 
            label="Contraseña"
            :rules="passwordRules"
            >
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
        </form>
        <div class="sign-in_btn text-center">
            <q-btn color="secondary" label="Iniciar Sesión" />
        </div>
        <div class="additional-actions text-center my-3">
            <div class="font-dm-sans-regular">No tiene una cuenta?</div>
            <RouterLink to="/sign-up" class="underline font-dm-sans-bold text-a">
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