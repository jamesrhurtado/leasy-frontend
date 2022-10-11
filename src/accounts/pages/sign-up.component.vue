<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const name = ref(null)
    const nameRef = ref(null)

    const lastName = ref(null)
    const lastNameRef = ref(null)

    const email = ref(null)
    const emailRef = ref(null)

    const password = ref(null)
    const passwordRef = ref(null)
    const isPwd = ref(true)

    const confirmPassword = ref(null)
    const confirmPasswordRef = ref(null)
    const isPwdConfirm = ref(true)


    const accept = ref(false)

    return {
        name,
        nameRef,
        nameRules: [
            val => (val && val.length > 0) || 'Por favor, ingrese un nombre'
        ],

        lastName,
        lastNameRef,
        lastNameRules: [
            val => (val && val.length > 0) || 'Por favor, ingrese un nombre'
        ],

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

        confirmPassword,
        confirmPasswordRef,
        confirmPasswordRules: [
            val => (val && val.length > 0) || 'Este campo es obligatorio'
        ],
        isPwd,
        isPwdConfirm,
        accept,

      onSubmit () {
        nameRef.value.validate()
        lastNameRef.value.validate()
        emailRef.value.validate()
        passwordRef.value.validate()
        confirmPasswordRef.value.validate()

        if (nameRef.value.hasError || lastNameRef.value.hasError || emailRef.value.hasError) {
            $q.notify({
            color: 'negative',
            message: 'No se pudo registrar. Verifique sus datos.',
            actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]
            
          })
        }
        else if (accept.value !== true) {
            $q.notify({
                color: 'negative',
                message: 'Necesita aceptar los terminos y condiciones',
                actions: [
                    { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                ]
            })
        }
        else {
            $q.notify({
                icon: 'done',
                color: 'positive',
                message: 'Se ha registrado al usuario',
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
    <div class="grid shadow-md w-96 m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Registrarse
        </div>
        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="p-3">
            <q-input
                ref="nameRef" 
                class="p-2" 
                outlined 
                v-model="name" 
                label="Nombres" 
                :rules="nameRules"
            />
            <q-input 
                ref="lastNameRef" 
                class="p-2" 
                outlined 
                v-model="lastName" 
                label="Apellidos" 
                :rules="lastNameRules"
            />
            <q-input 
                ref="emailRef" 
                class="p-2" 
                outlined 
                v-model="email" 
                label="Correo electronico" 
                :rules = "emailRules"
            />
            <q-input 
                ref="passwordRef" 
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
            <q-input 
                ref="confirmPasswordRef" 
                class="p-2" 
                outlined 
                v-model="confirmPassword" 
                :type="isPwdConfirm ? 'password' : 'text'" 
                label="Confirmar contraseña"
                :rules="confirmPasswordRules"
            >
                <template v-slot:append>
                    <q-icon
                        :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwdConfirm = !isPwdConfirm"
                    />
                </template>
            </q-input>
            <q-toggle v-model="accept" class="p-3 text-center" label="Acepto los terminos y condiciones" />
            <div class="sign-in_btn text-center">
                <q-btn color="secondary" label="Registrarse" type="submit" />
            </div>
        </form>
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