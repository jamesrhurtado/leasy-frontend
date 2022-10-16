<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const columns = [
  {
    name: 'periodo',
    required: true,
    label: 'Número',
    align: 'center',
    field: 'periodo',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'P.G.', field: 'calories', sortable: true },
  { name: 'fat', label: 'Saldo inicial', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Interés', field: 'carbs' },
  { name: 'protein', label: 'Cuota', field: 'protein' },
  { name: 'sodium', label: 'Amortización', field: 'sodium' },
  { name: 'calcium', label: 'Seguro riesgo', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Comisión', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'protein', label: 'Recompra', field: 'protein' },
  { name: 'protein', label: 'Saldo final', field: 'protein' },
  { name: 'protein', label: 'Depreciacion', field: 'protein' },
  { name: 'protein', label: 'Ahorro tributario', field: 'protein' },
  { name: 'protein', label: 'IGV', field: 'protein' },
  { name: 'protein', label: 'Flujo bruto', field: 'protein' },
  { name: 'protein', label: 'Flujo con IGV', field: 'protein' },
  { name: 'protein', label: 'Flujo neto', field: 'protein' },
]

const rows = [
  {
    periodo: 1,
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    periodo: 2,
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    periodo: 3,
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    periodo:4,
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    periodo: 5,
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    periodo: 6,
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    periodo: 7,
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    periodo: 8,
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    periodo: 9,
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    periodo: 10,
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

const $q = useQuasar()

const name = ref(null)
const nameRef = ref(null)
const age = ref(null)
const ageRef = ref(null)
const accept = ref(false)

const options = ['Tasa Nominal', 'Tasa Efectiva']

function roundValue(num){
  return num.toFixed(2)
}


function onSubmit () {
  nameRef.value.validate()
  ageRef.value.validate()

  if (nameRef.value.hasError || ageRef.value.hasError) {
    // form has error
  }else if (accept.value !== true) {
    $q.notify({
      color: 'negative',
      message: 'You need to accept the license and terms first'
    })
  }else {
    $q.notify({
      icon: 'done',
      color: 'positive',
      message: 'Submitted'
    })
  }
}

function onReset () {
  name.value = null
  age.value = null
  nameRef.value.resetValidation()
  ageRef.value.resetValidation()
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
                        <q-select class="p-2" outlined v-model="rateType" :options="options" label="Tipo de tasa de interés" />
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
                </div>
            </form>
    <div class="font-dm-sans-bold text-xl my-3">Cronograma</div>
    <q-separator />
    <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      title="Schedule for Leasing"
      :rows="rows"
      :columns="columns"
      row-key="periodo"
      flat
      bordered
    />
  </div>
</template>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>