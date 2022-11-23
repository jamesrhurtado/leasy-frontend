<script setup>
import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from '../../stores/auth.store.js';
import AuthHeader from '@/components/auth-header.component.vue';
import Footer from '@/components/footer.component.vue'

</script>
<template>
    <AuthHeader />
    <div class="flex flex-row mb-12">
        <div class="w-96 h-auto m-auto pt-4 mt-24 mx-20 font-dm-sans-regular texto">
            <div class="text-8xl">Bienvenido a Leasy</div>
            <br>
            <text-body1 class="text-xl">Le ayudamos a calcular el Leasing financiero a través del método Alemán.
            </text-body1>
            <br>
            <div class="puntos m-4">
                <q-btn dense round flat icon="check">
                    Al instante
                </q-btn>
                <q-btn dense round flat icon="check">
                    Incluye diversas monedas
                </q-btn>
            </div>
            <q-btn dense round flat icon="check" class="m-4">
                Resultados precisos
            </q-btn>
            <q-btn dense round flat icon="check">
                100% digital
            </q-btn>
            <br>
            <q-btn color="secondary" label="" type="submit" class="mx-4">
                <RouterLink to="/sign-up" class=" font-dm-sans-bold text-b ">
                    Registrarse
                </RouterLink>
            </q-btn>

            <RouterLink to="/information" class=" font-dm-sans-bold text-c">
                Aprenda mas sobre leasing →
            </RouterLink>
        </div>
        <div class="w-100 my-40 mx-20">
            <img alt="logo finanzas" src="@/assets/hero.png" />
        </div>
    </div>
    <Footer />
</template>

<style>
.container-img {
    margin-bottom: 50px;
}

.text-b {
    color: white
}

.text-c {
    color: darkcyan
}

.texto {
    margin-right: 100px;
}

.puntos {
    margin-right: px;
}
</style>