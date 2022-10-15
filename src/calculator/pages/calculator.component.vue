<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
export default {
    setup () {
        const $q = useQuasar()

        const name = ref(null)
        const nameRef = ref(null)

        const age = ref(null)
        const ageRef = ref(null)

        const accept = ref(false)

        return {
            name,
            nameRef,
            nameRules: [
                val => (val && val.length > 0) || 'Please type something'
            ],

            age,
            ageRef,
            ageRules: [
                val => (val !== null && val !== '') || 'Please type your age',
                val => (val > 0 && val < 100) || 'Please type a real age'
            ],

            accept,

            onSubmit () {
                nameRef.value.validate()
                ageRef.value.validate()

                if (nameRef.value.hasError || ageRef.value.hasError) {
                    // form has error
                }
                else if (accept.value !== true) {
                    $q.notify({
                        color: 'negative',
                        message: 'You need to accept the license and terms first'
                    })
                }
                else {
                    $q.notify({
                        icon: 'done',
                        color: 'positive',
                        message: 'Submitted'
                    })
                }
            },

            onReset () {
                name.value = null
                age.value = null

                nameRef.value.resetValidation()
                ageRef.value.resetValidation()
            }
        }
    }
}

</script>

<template>
    <div class="w-auto m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-4xl md:text-5xl">Leasing</div>
        <div class="font-dm-sans-bold text-xl">Ingrese los datos</div>
        <q-separator />
            <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del prestamo</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Precio de venta del activo" />
                        <q-input class="p-2" outlined v-model="nYears" label="Número de años" />
                        <q-input class="p-2" outlined v-model="paymentFrequency" label="Frecuencia de pago" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Tipo de tasa de interés" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Capitalización" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Porcentaje de tasa" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Porcentaje de recompra" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos iniciales</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Costes notariales" />
                        <q-input class="p-2" outlined v-model="nYears" label="Costes registrales" />
                        <q-input class="p-2" outlined v-model="paymentFrequency" label="Tasación" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión de estudio" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión de activación" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos periódicos</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión periódica" />
                        <q-input class="p-2" outlined v-model="nYears" label="Porcentaje de seguro de riesgo" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del costo de oportunidad</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Tasa de descuento Ks" />
                        <q-input class="p-2" outlined v-model="nYears" label="Tasa de descuento WACC" />
                    </div>
                    <div>
                        <q-btn color="black" label="Calcular" />
                    </div>
                    <div>
                        <q-btn color="red" label="Limpiar" />
                    </div>
                </div>
            </form>
    </div>
    <div class="font-dm-sans-bold text-xl">Resultados</div>
        <q-separator />
            <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados de arrendamiento</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="IGV" />
                        <q-input class="p-2" outlined v-model="nYears" label="Valor venta del activo" />
                        <q-input class="p-2" outlined v-model="paymentFrequency" label="Monto del Leasing" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="% de TEP" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Numero de cuotas por año" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Numero total de cuotas" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados totales por ...</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Intereses" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Amortizacion del capital" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Seguro contra todo riesgo" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisiones periodicas" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Recompra" />
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Desembolso total" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados costes/gastos periódicos</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="Seguro riesgo" />
                        <q-input class="p-2" outlined v-model="nYears" label="Porcentaje de seguro de riesgo" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Indicadores de rentabilidad</div>
                        <q-input class="p-2" outlined v-model="pVentaActivo" label="TCEA Flujo Bruto" />
                        <q-input class="p-2" outlined v-model="nYears" label="TCEA Flujo Neto" />
                        <q-input class="p-2" outlined v-model="nYears" label="VAN Flujo Bruto" />
                        <q-input class="p-2" outlined v-model="nYears" label="VAN Flujo Neto" />
                    </div>
                    <div>
                        <q-btn color="black" label="Calcular" />
                    </div>
                    <div>
                        <q-btn color="red" label="Limpiar" />
                    </div>
                </div>
            </form>
    <div class="font-dm-sans-bold text-xl">Cronograma</div>
    <q-separator />
</template>

<style>

</style>