<script setup>

import { useQuasar, QSpinnerGears } from 'quasar'
import { ref, reactive, nextTick } from 'vue'
import {ReportsService} from '@/reports/services/reports.service.js'
import { useSettingsStore } from '../../stores/settings.store.js';
import { useAuthStore } from '../../stores/auth.store.js';
import { onBeforeUnmount } from 'vue'
import Header from '@/components/header.component.vue'

let timer

const SettingsStore = useSettingsStore()
const settings  = SettingsStore.settings;

const UserStore = useAuthStore()
const user = UserStore.user

//Template for table
//Columns
const columns = [
  { name: 'periodo', required: true, label: 'Número', align: 'center', field: 'periodo', format: val => `${val}`, sortable: true},
  { name: 'gp', align: 'center', label: 'P.G.', field: 'gp', sortable: true },
  { name: 'initialValue', label: 'Saldo inicial', field: 'initialValue', sortable: true },
  { name: 'interest', label: 'Interés', field: 'interest' },
  { name: 'quota', label: 'Cuota', field: 'quota' },
  { name: 'repayment', label: 'Amortización', field: 'repayment' },
  { name: 'riskInsurance', label: 'Seguro riesgo', field: 'riskInsurance', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'comission', label: 'Comisión', field: 'comission', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'buyback', label: 'Recompra', field: 'buyback' },
  { name: 'finalValue', label: 'Saldo final', field: 'finalValue' },
  { name: 'depreciation', label: 'Depreciacion', field: 'depreciation' },
  { name: 'taxSaving', label: 'Ahorro tributario', field: 'taxSaving' },
  { name: 'ivaQuota', label: 'IGV', field: 'ivaQuota' },
  { name: 'grossFlow', label: 'Flujo bruto', field: 'grossFlow' },
  { name: 'ivaFlow', label: 'Flujo con IGV', field: 'ivaFlow' },
  { name: 'netFlow', label: 'Flujo neto', field: 'netFlow' },
]

//Template for table
//Rows
const rows = reactive([])

const $q = useQuasar()
const name = ref(null)
const reportsService = new ReportsService()
//loading
onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

function showLoading () {
  $q.loading.show({
    message: 'Calculando resultados'
  })

  timer = setTimeout(() => {
    $q.loading.show({
      spinner: QSpinnerGears,
      spinnerColor: 'gray',
      messageColor: 'white',
      backgroundColor: 'green-9',
      message: 'Generando tabla'
    })

    timer = setTimeout(() => {
      $q.loading.hide()
      timer = void 0
    }, 2000)
  }, 2000)
}
//stores data to save report
const currentReport = reactive({
    assetPrice: "",
    leasingYears: "",
    paymentFrequency: "",
    rateType: "",
    rateFrequency: "",
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
  assetValue: null,
  ivaValue: null,
  leasingValue: null,
  periodEffectiveRate: null,
  quotasPerYear : null,
  totalQuotas : null,
  totalInterest : null,  
  totalRepayment : null,
  riskInsuranceValue: null,
  periodicCommissions: null,
  buybackValue : null,
  totalPayment: null,
  totalRiskInsurance: null,
  grossFlowEar : null,
  netFlowEar : null,
  grossFlowNpv : null,
  netFlowNpv : null
})

const gracePeriods = reactive({
  total: null,
  partial: null
})

const VAT = (settings.valueAddedTax)/100
const INCOME_TAX = (settings.incomeTax)/100
const DAYS_PER_YEAR = settings.daysPerYear

let showResults = false;

const accept = ref(false)

//options for dropdown fields
const rateOptions = [
  {label: 'Tasa Nominal', value: 'nominal'},
  {label: 'Tasa Efectiva', value: 'effective'},
]

const periodicals = [
  {label: 'Diaria', value: 'daily'},
  {label: 'Quincenal', value: 'biweekly'},
  {label: 'Mensual', value: 'monthly'},
  {label: 'Bimestral', value: 'bimonthly'},
  {label: 'Trimestral', value: 'quarterly'},
  {label: 'Cuatrimestral', value: 'four-monthly'},
  {label: 'Semestral', value: 'six-montly'},
  {label: 'Anual', value: 'yearly'}
]

//ADD function to validate fields
function validateInputFields(){
//cannot be grace period in last period
}


function showText(){
  console.log(showResults)
  showResults = !showResults
  console.log(showResults)
}

const handleSubmit = async () => {
  console.log(showResults)
  showResults = true;
  console.log(showResults)
  validateInputFields()
  const storableData = loadData()
  //await reportsApiService.create(storableData)
  calculateLeasingResults(storableData)
  calculateTotalResults(storableData)
  calculateRecurringCosts(storableData)
  calculateProfitabilityIndicators(storableData)
  generateSchedule(storableData)
  console.log(rows.value)
}

//returns the data in a storable type (string-> number)

//HELPER FUNCTIONS
function loadData(){
  const data = {
    assetPrice: roundDecimal((currentReport.assetPrice)),
    leasingYears: parseInt(currentReport.leasingYears),
    paymentFrequency: currentReport.paymentFrequency.value,
    rateType: currentReport.rateType.value,
    rateFrequency: currentReport.rateFrequency.value,
    capitalization: currentReport.capitalization.value,
    rateValue: roundPercentage(parseFloat(currentReport.rateValue)),
    buyback: roundPercentage((currentReport.buyback)),
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

function getDaysPerFrequency(frequency){
  switch(frequency){
    case 'daily':
      return 1
    case 'biweekly':
      return 15
    case 'monthly':
      return 30
    case 'bimonthly':
      return 60
    case 'quarterly':
      return 90
    case 'four-monthly':
      return 120
    case 'six-monthly':
      return 180
    case 'yearly':
      return 360
    default:
      console.log("No valid data.")
  }
}

//CHECK RATE AND CALCULATE ACCORDINGLY
function calculateRate(data){
  const paymentFrequencyDays = getDaysPerFrequency(data.paymentFrequency)
  const rateFrequencyDays = getDaysPerFrequency(data.rateFrequency)
  if(data.rateType === 'nominal'){
    const m = (rateFrequencyDays)/(data.capitalization)
    const n = paymentFrequencyDays/(data.capitalization)
    reportResults.periodEffectiveRate = calculatePeriodEffectiveRateWithNominalRate(data.rateValue, n, m)
  }else if(data.rateType === 'effective'){
    reportResults.periodEffectiveRate = calculatePeriodEffectiveRateWithEffectiveRate(data.rateValue, paymentFrequencyDays, rateFrequencyDays)
  }else{
    console.log("There was an error.")
  }
}

//CALCULATING TEP
function calculatePeriodEffectiveRateWithNominalRate(rateValue, n, m){
  let rate = roundPercentage((Math.pow(1 + ((rateValue/100)/ m), n)-1)*100)
  return rate
}

function calculatePeriodEffectiveRateWithEffectiveRate(rateValue, paymentFrequencyDays, rateFrequencyDays){
  let rate = roundPercentage((Math.pow(1 + (rateValue/100), (paymentFrequencyDays/rateFrequencyDays)) - 1) * 100)
  return rate
}

function calculateLeasingResults(data){
  const paymentFrequencyDays = getDaysPerFrequency(data.paymentFrequency)
  reportResults.ivaValue = roundDecimal(data.assetPrice / (1 + VAT) * VAT)
  reportResults.assetValue = roundDecimal(data.assetPrice - reportResults.ivaValue)
  reportResults.leasingValue = roundDecimal(reportResults.assetValue + data.notaryFees + data.registryFees + data.valuation + data.studyCommission + data.activationCommission)
  calculateRate(data)
  reportResults.quotasPerYear = DAYS_PER_YEAR/paymentFrequencyDays
  reportResults.totalQuotas = data.leasingYears * reportResults.quotasPerYear
}

function calculateTotalResults(data){
  reportResults.periodicCommissions = roundDecimal(data.regularCommission * reportResults.totalQuotas)
}

function calculateRecurringCosts(data){
  reportResults.riskInsuranceValue = calculateRiskInsuranceValue(data.riskInsurance, data.assetPrice, reportResults.quotasPerYear)
}

function calculateRiskInsuranceValue(riskInsurance, assetPrice, quotasPerYear){
  let value = (riskInsurance/100 * assetPrice)/ quotasPerYear
  return value
}

function calculateProfitabilityIndicators(data){

}

function generateSchedule(data){
  let initialValue = reportResults.leasingValue
  let repayment = (reportResults.leasingValue/reportResults.totalQuotas)
  let totalInterest = 0
  let totalRepayment = 0
  let totalRiskInsurance = 0
  let ivaQuota = 0
  let grossFlow = 0
  let ivaFlow = 0
  let netFlow = 0
  let gp = ''
  let depreciation = (reportResults.assetValue / reportResults.totalQuotas)
  //recompra
  let buyback = 0
  const totalGracePeriods = gracePeriods.total.split(",")
  const partialGracePeriods = gracePeriods.partial.split(",")
  //VAN FLUJO BRUTO
  let grossFlowNpv = 0
  let rateGrossFlowNpv = (Math.pow(1 + (data.ksRate)/100, getDaysPerFrequency(data.paymentFrequency)/DAYS_PER_YEAR ) - 1)
  let grossFlowNpvPerQuota = 0
  let sumGrossFlowVpn = 0
  let quota = 0
  let finalValue = 0
  let interest = 0

  //VAN FLUJO NETO
  let netFlowNpv = 0
  let rateNetFlowNpv = (Math.pow(1 + (data.waccRate)/100, getDaysPerFrequency(data.paymentFrequency)/DAYS_PER_YEAR ) - 1)
  let netFlowNpvPerQuota = 0
  let sumNetFlowVpn = 0

  for(let i=1; i <= reportResults.totalQuotas; i++){
    interest = (initialValue * (reportResults.periodEffectiveRate/100))
    totalInterest = totalInterest + interest
    //contador para sumar seguro riesgo
    totalRiskInsurance += reportResults.riskInsuranceValue
    let taxSaving = (interest + reportResults.riskInsuranceValue + data.regularCommission + depreciation)*INCOME_TAX
    
    if(totalGracePeriods.includes(i.toString())){
      repayment = 0
      quota = 0
      finalValue = initialValue + interest
      gp = 'T'
    }else if(partialGracePeriods.includes(i.toString())){
      repayment = 0
      quota = interest
      finalValue = initialValue
      gp = 'P'
    }else{
      gp = 'S'
      repayment = (initialValue/(reportResults.totalQuotas - i + 1))
      quota = (interest + repayment)
      finalValue = initialValue - repayment
    }

    totalRepayment = totalRepayment + repayment
  
    if(i === reportResults.totalQuotas){
      buyback = (reportResults.assetValue * (data.buyback/100))
      reportResults.buybackValue = buyback
      grossFlow = quota + reportResults.riskInsuranceValue + data.regularCommission + buyback
      ivaQuota = grossFlow * VAT
      ivaFlow = (grossFlow + ivaQuota)
      netFlow = (grossFlow - taxSaving)
    }else{
      grossFlow = quota + reportResults.riskInsuranceValue + data.regularCommission + buyback
      ivaQuota = (grossFlow * VAT)
      ivaFlow = (grossFlow + ivaQuota)
      netFlow = (grossFlow - taxSaving)
    }

    //VAN flujo bruto
    grossFlowNpvPerQuota = (grossFlow / Math.pow(1 + rateGrossFlowNpv, i))
    sumGrossFlowVpn = sumGrossFlowVpn + grossFlowNpvPerQuota
    grossFlowNpvPerQuota = 0

    //VAN flujo neto

    netFlowNpvPerQuota = (netFlow / Math.pow(1 + rateNetFlowNpv, i))
    sumNetFlowVpn = sumNetFlowVpn + netFlowNpvPerQuota
    netFlowNpvPerQuota = 0

    rows.push({
      periodo: i,
      gp: gp,
      initialValue: roundDecimal(initialValue),
      interest: roundDecimal(interest),
      quota: roundDecimal(quota),
      repayment: roundDecimal(repayment),
      riskInsurance: reportResults.riskInsuranceValue,
      comission: data.regularCommission,
      buyback: roundDecimal(buyback),
      finalValue: roundDecimal(finalValue),
      depreciation: roundDecimal(depreciation),
      taxSaving: roundDecimal(taxSaving),
      ivaQuota: roundDecimal(ivaQuota),
      grossFlow: roundDecimal(grossFlow),
      ivaFlow: roundDecimal(ivaFlow),
      netFlow: roundDecimal(netFlow)
    })
    initialValue = finalValue
  }
  reportResults.totalInterest = roundDecimal(totalInterest)
  reportResults.totalRepayment = roundDecimal(totalRepayment)
  reportResults.totalRiskInsurance = roundDecimal(totalRiskInsurance)
  reportResults.periodicCommissions = roundDecimal(data.regularCommission * reportResults.totalQuotas)
  reportResults.totalPayment = roundDecimal(totalInterest + totalRepayment + totalRiskInsurance + reportResults.periodicCommissions + reportResults.buybackValue)
  reportResults.grossFlowNpv = roundDecimal(reportResults.leasingValue - sumGrossFlowVpn)
  reportResults.netFlowNpv =  roundDecimal( reportResults.leasingValue - sumNetFlowVpn)
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
  <Header />
    <div class="w-auto m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-4xl md:text-5xl pt-28">Leasing</div>
        <div class="font-dm-sans-bold text-xl">Ingrese los datos</div>
        <q-separator />
            <form @submit.prevent.stop="handleSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del prestamo</div>
                        <q-input class="p-2" outlined v-model="currentReport.assetPrice" type="number" label="Precio de venta del activo" />
                        <q-input class="p-2" outlined v-model="currentReport.leasingYears" type="number" label="Número de años" />
                        <q-select class="p-2" outlined v-model="currentReport.paymentFrequency" :options="periodicals" label="Frecuencia de pago" />
                        <q-select class="p-2" outlined v-model="currentReport.rateType" :options="rateOptions" label="Tipo de tasa de interés" />
                        <q-select class="p-2" outlined v-model="currentReport.rateFrequency" :options="periodicals" label="Frecuencia de tasa" />
                        <q-select v-show="currentReport.rateType.value !== 'effective'" class="p-2" outlined v-model="currentReport.capitalization" :options="periodicals" label="Capitalización" />
                        <q-input class="p-2" outlined v-model="currentReport.rateValue" type="number" label="Porcentaje de tasa" />
                        <q-input class="p-2" outlined use-chips v-model="currentReport.buyback" label="Porcentaje de recompra" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos iniciales</div>
                        <q-input class="p-2" outlined v-model="currentReport.notaryFees" type="number" label="Costes notariales" />
                        <q-input class="p-2" outlined v-model="currentReport.registryFees" type="number" label="Costes registrales" />
                        <q-input class="p-2" outlined v-model="currentReport.valuation" type="number" label="Tasación" />
                        <q-input class="p-2" outlined v-model="currentReport.studyCommission" type="number" label="Comisión de estudio" />
                        <q-input class="p-2" outlined v-model="currentReport.activationCommission" type="number" label="Comisión de activación" />
                        <q-input class="p-2" outlined v-model="gracePeriods.total" label="Periodos de Gracia Totales" />
                        <q-input class="p-2" outlined v-model="gracePeriods.partial" label="Periodos de Gracia Parciales" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos periódicos</div>
                        <q-input class="p-2" outlined v-model="currentReport.regularCommission" type="number" label="Comisión periódica" />
                        <q-input class="p-2" outlined v-model="currentReport.riskInsurance" label="Porcentaje de seguro de riesgo" />
                    </div>
                    <div>
                        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del costo de oportunidad</div>
                        <q-input class="p-2" outlined v-model="currentReport.ksRate " label="Tasa de descuento Ks" />
                        <q-input class="p-2" outlined v-model="currentReport.waccRate" label="Tasa de descuento WACC" />
                    </div>
                    <div>
                        <q-btn color="black" label="Calcular" type="submit" @click="showLoading"/>
                    </div>
                    <div>
                        <q-btn color="red" label="Limpiar" />
                    </div>
                </div>
            </form>
    </div>

    <div v-if="showResults" class="font-dm-sans-bold text-xl">Resultados</div>
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
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.periodEffectiveRate }}</div>
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
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.totalRiskInsurance }}</div>
                          </template>
                        </q-field>

                        <q-field class="p-2" outlined label="Comisiones periodicas" stack-label readonly>
                          <template v-slot:control>
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.periodicCommissions }}</div>
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
                            <div class="self-center full-width no-outline" tabindex="0">{{reportResults.riskInsuranceValue }}</div>
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

<style lang="sass" scoped>
.my-sticky-header-table
  /* height or max-height is important */
  height: 420px

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
.invisible
  visibility: hidden
body
  display: block
</style>