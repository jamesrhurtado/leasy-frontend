<script setup>

import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from "vue-router";
import { AuthService } from '../services/auth.service';
import AuthHeader from '@/components/auth-header.component.vue'
import Footer from '@/components/footer.component.vue'

const $q = useQuasar()
const authService = new AuthService()
const router = useRouter();
const user = reactive({
    email: "",
    password: ""
})

//validation settings
const email = ref(null)
const emailRef = ref(null)

const password = ref(null)
const passwordRef = ref(null)
const isPwd = ref(true)

//validation rules
const emailRules = [val => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) || 'Por favor, ingrese un correo valido']
const passwordRules = [val => (val && val.length > 0) || 'Este campo es obligatorio']

const validateData = () => {
    let valid = false
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
    }else{
        valid = true;
    }
    return valid
}

const handleSubmit = async () => {
    const validData = validateData()
    const status = await authService.login(user)
    if(status && validData){
        $q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Usuario autenticado.',
            actions: [{ label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }]
        })
        router.push("/calculator")
    }else{
        $q.notify({
            color: 'negative',
            message: 'Los datos ingresados no coinciden. Verifique sus datos.',
            actions: [
                { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
            ]  
        })
    }
}

</script>

<template>
    <AuthHeader />
    <div class="grid shadow-md w-96 h-auto m-auto my-6 font-dm-sans-regular pt-4 mt-24">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Iniciar Sesión
        </div>
        <form @submit.prevent.stop="handleSubmit" class="p-3">
            <q-input 
            ref = "emailRef"
            class="p-2" 
            outlined 
            v-model="user.email" 
            label="Correo electronico" 
            :rules="emailRules"
            />
            <q-input 
            ref = "passwordRef"
            class="p-2" 
            outlined 
            v-model="user.password" 
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
            <div class="sign-in_btn text-center">
            <q-btn color="secondary" label="Iniciar Sesión" type="submit" />
        </div>
        </form>
        <div class="additional-actions text-center my-3">
            <div class="font-dm-sans-regular">No tiene una cuenta?</div>
            <RouterLink to="/sign-up" class="underline font-dm-sans-bold text-a">
          REGISTRARSE
        </RouterLink>
        </div>
    </div>
    <Footer />
</template>
<style>

.text-a{
    color: var(--color-text-a)
}
</style>