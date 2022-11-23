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
    <div class="w-96 h-auto m-auto my-20 font-dm-sans-regular texto" >
        <h1> Calcule el Leasing</h1>
        <br>
        <text-body1>Le ayudamos a calcular el Leasing financiero a través del método Alemán.</text-body1>
        <br>
        <div class="puntos">
            <q-btn dense round flat icon="check">
            Al instante
        </q-btn> 
        <q-btn dense round flat icon="check">
            Incluye diversas monedas
        </q-btn> 
        </div>   
        <q-btn dense round flat icon="check">
        Resultados precisos
        </q-btn>    <q-btn dense round flat icon="check">
        100% digital
        </q-btn>
        <br>
        <q-btn color="secondary" label="" type="submit" >
            <RouterLink to="/sign-up" class=" font-dm-sans-bold text-b ">
                Registrarse
            </RouterLink>
                </q-btn>

        <RouterLink to="/information" class=" font-dm-sans-bold text-c">
        Aprenda mas sobre leasing →
        </RouterLink>
    </div>
    <div class="w-80 h-auto m-auto my-20 container-img" >
        <img alt="logo finanzas" src="@/assets/logof.png"/>
    </div>
    <Footer />
</template>

<style>
.container-img{
    float: right;
    margin-bottom: 50px;
    
}
.text-b{
    color:white
}
.text-c{
    color:darkcyan
}
.texto{
    float: left;
    margin-right: 100px;
    
}
.puntos{
    margin-right: px;
}

</style>