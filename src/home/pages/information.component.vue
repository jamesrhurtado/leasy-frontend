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
        <div class="w-auto h-auto m-auto my-5 font-dm-sans-regular texto mt-24" >
            <div class="titulo">
            <h1> Leasy</h1>
            </div>
            <br>
            <h3>¿Que es un leasing financiero?</h3>
            <br>
            <text-body1 class="text-lg">
                Un leasing financiero es un contrato comercial, en la cual un arrendador
                arrienda a un arriendatario bienes por un tiempo determinado a cambio de 
                una contra prestación económica. Además, este puede optar por la compra del bien,
                cuando se venza el plazo de arrendamiento determinado.
            </text-body1>
            <br>
            <br>
            <div class="elementos text-lg">
                <p>Elementos de un leasing:</p>
            </div>
            <div class="puntos">
            <q-btn dense round flat icon="check" >
                Arrendatario
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Arrendador
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Suministrador o Proveedor
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Contrato
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Alquiler
            </q-btn>
            <br>
            </div>
            <br>
            <h4>¿Cómo funciona el leasing?</h4>
            <br>
            <text-body2  class="text-lg">
                El leasing financiero es realizado por sociedades especializadas.
                La entidad o empresa financiera, adquiere el bien que ha de ser arrendado, retiene su propiedad 
                y facilita su uso y goce. Además, es un contrato bilateral y típico, regido por las leyes que 
                marcan su incentivo y uso.
                <br>
            </text-body2>
            <br>
            <h4 class="mb-8">Características del leasing financiero</h4>
            <text-body2>
            <q-btn dense round flat icon="check">
                Es flexible, es decir cuenta con cuotas fijas o variables.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Financia hasta el 100% del bien de capital.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                El cliente tomador asume la obligación de conservar el bien contratado.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                El plazo de contrato, en su mayoría, coincide con la vida económica dle bien.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Se reconoce una opción de compra irrevocable para el cliente tomador.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                La declinación de ocompra solo se libera si el dador considera recuperada la inversión realizada.
            </q-btn>
            <br>
            <q-btn dense round flat icon="check">
                Tiene una duración usual de 3 a 5 años.
            </q-btn>
            <br>
            </text-body2>
            <br>
            <h4 >Marco legal</h4>
            <br>
            <text-body3 class="text-lg">
                Se puede realizar un uso seguro del leasing  porque esta protegido por:
                <br>
                <a class="font-semibold underline underline-offset-4" href="http://galvezconsultores.com/pdf-normas/LEASING%20(D.Leg.299).pdf" target="_blank">Decreto legislativo Nº299</a>
                <br>
                Referido a las normas aplicables para la ejecución y contrataciónde operaciones de Leasing o 
                Arrendamiento financiero.
                El Decreto Legislativo Nº915, es una modificatoria al Decreto Legislativo N°299, y que precisa 
                los alcances del artículo18°, modificado por la ley N° 27394.
            <br>
            </text-body3>
            <br>
            <h4 class="mb-8">Método Alemán</h4>
            <text-body4 class="text-lg mb-8">
                En esta plataforma hacemos uso del método Alemán, el cual establece un valor de cuotas variables
                y siendo decreciente cada mes, hasta su cancelación total de la deuda.
            </text-body4>
            <br>
            <h4 class="mb-8 mt-8">Informacion adicional</h4>
            <text-body4 class="text-lg mb-8">
                En caso se deseen profundizar en temas de finanzas e ingeniería económica, es recomendable acudir
                a <a class="font-semibold underline underline-offset-4" href="http://www.e-financebook.com/" target="_blank">E-finance Book</a>
                , un recurso muy valuado y usado como base para el desarrollo de este proyecto.
            </text-body4>
            <br>
            <br>
            <text-body4 class="text-lg mb-8">
                Efinance Book fue desarrollado por el destacado docente 
                <a class="font-semibold underline underline-offset-4" href="https://www.linkedin.com/in/martin-senmache-36115911/" target="_blank">José Manuel Martín Senmache Sarmiento</a>,
                a quien agradecemos por los conocimientos brindados durante el semestre académico 2022-2 en UPC.
            </text-body4>
            <br>
            <q-btn color="secondary" label="" type="submit" class="mt-8">
                <RouterLink to="/" class=" font-dm-sans-bold text-b ">
                    Registrarse para acceder a la calculadora
                </RouterLink>
            </q-btn>
        </div>
        <Footer />
</template>

<style>
.elementos{
    text-size-adjust: 20px;
}
.texto{
    margin-right: 100px;
}
.puntos{
    margin-right: px;
}
.titulo{
    color:darkcyan
}
</style>