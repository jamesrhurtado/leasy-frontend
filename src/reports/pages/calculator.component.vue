<script setup>

import { useQuasar } from 'quasar'
import { ref, reactive } from 'vue'
import {ReportsService} from '@/reports/services/reports.service.js'

//Template for table
//Columns
const columns = [
  { name: 'periodo', required: true, label: 'Número', align: 'center', field: 'periodo', format: val => `${val}`, sortable: true},
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

//Template for table
//Rows

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
const reportsService = new ReportsService()

//stores data to save report
const currentReport = reactive({
    assetPrice: "",
    leasingYears: "",
    paymentFrequency: "",
    rateType: "",
    capitalization: "",
    rateValue: "",
    buyback: "",
    notaryFees: "",
    registryFees: "",
    valuation: "",
    studyCommission: "",
    activationCommission: "",
    regularCommission: "",
    riskInsurance: "",
    ksRate: "",
    waccRate: ""
})

//stores the results to be displayed
const reportResults = reactive({
  assetValue: "",
  ivaValue: "",
  leasingValue: "",
  effectiveRate: "",
  quotasPerYear : "",
  totalQuotas : "",
  totalInterest : "",  
  totalRepayment : "",
  riskInsuranceValue: "",
  periodicCommissions: "",
  buybackValue : "",
  totalPayment: "",
  totalRiskInsurance: "",
  grossFlowEar : "",
  netFlowEar : "",
  grossFlowNpv : "",
  netFlowNpv : ""
})

const IGV = 0.18
const DAYS_PER_YEAR = 360

const accept = ref(false)

//options for dropdown fields
const rateOptions = [
  {label: 'Tasa Nominal', value: 'nominal'},
  {label: 'Tasa Efectiva', value: 'efectiva'},
]

const periodicals = [
  {label: 'Diaria', value: 'diaria'},
  {label: 'Quincenal', value: 'quincenal'},
  {label: 'Mensual', value: 'mensual'},
  {label: 'Bimestral', value: 'bimestral'},
  {label: 'Trimestral', value: 'trimestral'},
  {label: 'Cuatrimestral', value: 'cuatrimestral'},
  {label: 'Semestral', value: 'semestral'},
  {label: 'Anual', value: 'anual'}
]

//ADD function to validate fields
function validateInputFields(){

}

const handleSubmit = async () => {
  validateInputFields()
  const storableData = loadData()
  //await reportsApiService.create(storableData)
  calculateLeasingResults(storableData)
  //calculateTotalResults(storableData)
  //calculatePermanentSpendings(storableData)
  //calculateProfitabilityIndicators(storableData)
  //generateSchedule(storableData)
}

//returns the data in a storable type (string-> number)
function loadData(){
  const data = {
    assetPrice: roundDecimal((currentReport.assetPrice)),
    leasingYears: parseInt(currentReport.leasingYears),
    paymentFrequency: parseInt(currentReport.paymentFrequency),
    rateType: currentReport.rateType.value,
    capitalization: currentReport.capitalization.value,
    rateValue: roundPercentage(parseFloat(currentReport.rateValue)),
    buyback: roundDecimal((currentReport.buyback)),
    notaryFees: roundDecimal((currentReport.notaryFees)),
    registryFees: roundDecimal((currentReport.registryFees)),
    valuation: roundDecimal((currentReport.valuation)),
    studyCommission: roundDecimal((currentReport.studyCommission)),
    activationCommission: roundDecimal((currentReport.activationCommission)),
    regularCommission: roundDecimal((currentReport.regularCommission)),
    riskInsurance: roundPercentage((currentReport.riskInsurance)),
    ksRate: roundPercentage((currentReport.ksRate)),
    waccRate: roundPercentage((currentReport.waccRate))
  }
  return data
}

function roundDecimal(x){
  return +parseFloat(x).toFixed(2)
}

function roundPercentage(x){
  return +parseFloat(x).toFixed(7)
}

function calculateRate(data){
  /*
  if tasa nominal:
    usar capitalizacion para hallar tasa
    asignar valor de tep
  if tasa efectiva
    calcular tasa y asignarla
  else
    nada  
  */
}

function calculateLeasingResults(data){
  reportResults.ivaValue = roundDecimal(data.assetPrice / (1 + IGV) * IGV)
  reportResults.assetValue = roundDecimal(data.assetPrice - reportResults.ivaValue)
  reportResults.leasingValue = roundDecimal(reportResults.assetValue + data.notaryFees + data.registryFees + data.valuation + data.studyCommission + data.activationCommission)
  //calculateRate()
}

//cleans the fields
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
            <form @submit.prevent.stop="handleSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del prestamo</div>
                        <q-input class="p-2" outlined v-model="currentReport.assetPrice" label="Precio de venta del activo" />
                        <q-input class="p-2" outlined v-model="currentReport.leasingYears" label="Número de años" />
                        <q-select class="p-2" outlined v-model="currentReport.paymentFrequency" :options="periodicals" label="Frecuencia de pago" />
                        <q-select class="p-2" outlined v-model="currentReport.rateType" :options="rateOptions" label="Tipo de tasa de interés" />
                        <q-select class="p-2" outlined v-model="currentReport.capitalization" :options="periodicals" label="Capitalización" />
                        <q-input class="p-2" outlined v-model="currentReport.rateValue" label="Porcentaje de tasa" />
                        <q-input class="p-2" outlined v-model="currentReport.buyback" label="Porcentaje de recompra" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos iniciales</div>
                        <q-input class="p-2" outlined v-model="currentReport.notaryFees" label="Costes notariales" />
                        <q-input class="p-2" outlined v-model="currentReport.registryFees" label="Costes registrales" />
                        <q-input class="p-2" outlined v-model="currentReport.valuation" label="Tasación" />
                        <q-input class="p-2" outlined v-model="currentReport.studyCommission" label="Comisión de estudio" />
                        <q-input class="p-2" outlined v-model="currentReport.activationCommission" label="Comisión de activación" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos periódicos</div>
                        <q-input class="p-2" outlined v-model="currentReport.regularCommission" label="Comisión periódica" />
                        <q-input class="p-2" outlined v-model="currentReport.riskInsurance" label="Porcentaje de seguro de riesgo" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del costo de oportunidad</div>
                        <q-input class="p-2" outlined v-model="currentReport.ksRate " label="Tasa de descuento Ks" />
                        <q-input class="p-2" outlined v-model="currentReport.waccRate" label="Tasa de descuento WACC" />
                    </div>
                    <div>
                        <q-btn color="black" label="Calcular" type="submit" />
                    </div>
                    <div>
                        <q-btn color="red" label="Limpiar" />
                    </div>
                </div>
            </form>
    </div>
    <div class="font-dm-sans-bold text-xl">Resultados</div>
        <q-separator />
            <div class="q-gutter-md">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados de arrendamiento</div>

                        <q-field class="p-2" outlined label="Valor venta del activo" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.assetValue}}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="IGV" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.ivaValue}}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Monto del Leasing" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.leasingValue}}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Porcentaje de TEP" prefix="%" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.effectiveRate }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Numero de cuotas por año" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.quotasPerYear }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Numero total de cuotas" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalQuotas }}</div>
                          </template>
                        </q-field>

                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados totales por ...</div>

                        <q-field class="p-2" outlined label="Intereses" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalInterest }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Amortizacion del capital" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalRepayment }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Seguro contra todo riesgo" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.riskInsuranceValue }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Comisiones periodicas" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.periodicComissions }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Recompra" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.buybackValue }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Desembolso total" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalPayment }}</div>
                          </template>
                        </q-field>
  
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados costes/gastos periódicos</div>

                        <q-field class="p-2" outlined label="Seguro riesgo" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalRiskInsurance }}</div>
                          </template>
                        </q-field>

                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Indicadores de rentabilidad</div>

                        <q-field class="p-2" outlined label="TCEA Flujo Bruto" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.grossFlowEar }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="TCEA Flujo Neto" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.netFlowEar }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="VAN Flujo Bruto" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.grossFlowNpv }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="VAN Flujo Neto" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.netFlowNpv }}</div>
                          </template>
                        </q-field>
                    </div>
                </div>
              </div>
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