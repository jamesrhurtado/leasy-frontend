<script setup>
import { useQuasar, QSpinnerGears } from 'quasar'
import { ref, reactive } from 'vue'
import { ReportsService } from '@/reports/services/reports.service.js'
import { useSettingsStore } from '../../stores/settings.store.js';
import { useAuthStore } from '../../stores/auth.store.js';
import { onBeforeUnmount } from 'vue'
import Header from '@/components/header.component.vue'
import Footer from '@/components/footer.component.vue'

//Stores
const SettingsStore = useSettingsStore()
const settings = SettingsStore.settings;

const UserStore = useAuthStore()
const auth = UserStore.user

//Services
const reportsService = new ReportsService()

//Schedule for Leasing
//Columns
const columns = [
  { name: 'periodo', required: true, label: 'Número', align: 'center', field: 'periodo', format: val => `${val}`, sortable: true },
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

//Rows
const rows = reactive([])

//UI config
const $q = useQuasar()
let timer

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})

function showLoading() {
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

const name = ref(null)

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
  rateKs: "",
  rateWacc: ""
})

//stores the results to be displayed
const reportResults = reactive({
  assetValue: null,
  ivaValue: null,
  leasingValue: null,
  periodEffectiveRate: null,
  quotasPerYear: null,
  totalQuotas: null,
  totalInterest: null,
  totalRepayment: null,
  riskInsuranceValue: null,
  periodicCommissions: null,
  buybackValue: null,
  totalPayment: null,
  totalRiskInsurance: null,
  grossFlowEar: null,
  netFlowEar: null,
  grossFlowNpv: null,
  netFlowNpv: null,
  irrGrossFlow: null,
  irrNetFlow: null
})

const gracePeriods = reactive({
  total: null,
  partial: null
})

//Const values from User Settings

const VAT = (settings.valueAddedTax) / 100
const INCOME_TAX = (settings.incomeTax) / 100
const DAYS_PER_YEAR = settings.daysPerYear

const accept = ref(false)

//options for dropdown fields
const rateOptions = [
  { label: 'Tasa Nominal', value: 'nominal' },
  { label: 'Tasa Efectiva', value: 'effective' },
]

const periodicals = [
  { label: 'Diaria', value: 'daily' },
  { label: 'Quincenal', value: 'biweekly' },
  { label: 'Mensual', value: 'monthly' },
  { label: 'Bimestral', value: 'bimonthly' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Cuatrimestral', value: 'four-monthly' },
  { label: 'Semestral', value: 'six-montly' },
  { label: 'Anual', value: 'yearly' }
]

//Settings for Validation
const moneyRef = ref(null)
const percentageRef = ref(null)
const frequencyRef = ref(null)
const timeRef = ref(null)
const rateRef = ref(null)
const gracePeriodsRef = ref(null)

//Additional data
let totalGracePeriods = []
let partialGracePeriods = []

//Rules for Validation
const moneyRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido. Si es opcional, ingrese 0.',
  val => (val >= 0) || 'El valor ingresado no es válido.'
]

const percentageRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido. Si es opcional, ingrese 0.',
  val => (val >= 0) || 'El valor ingresado no es válido.'
]

const frequencyRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido.'
]

const timeRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido.',
  val => (val > 0) || 'El valor ingresado no es válido.'
]

const rateRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido. Si no lo considera, ingrese 0',
  val => (val > 0) || 'El valor ingresado no es válido.'
]

const gracePeriodsRules = [
  val => (val !== null && val !== '') || 'Este dato es requerido. Ingreselo como x, y, z. Si no lo considera, ingrese 0'
]

function validateGracePeriods() {
  totalGracePeriods = gracePeriods.total.split(",").map(Number)
  partialGracePeriods = gracePeriods.partial.split(",").map(Number)
  //cannot exist grace period in last period
  let lastPeriod = parseInt(currentReport.leasingYears) * DAYS_PER_YEAR / getDaysPerFrequency(currentReport.paymentFrequency.value)

  if (totalGracePeriods.includes(lastPeriod) || partialGracePeriods.includes(lastPeriod)) {
    return false;
  }
  return true
}

function validateInputFields() {
  let valid = false
  moneyRef.value.validate()
  percentageRef.value.validate()
  frequencyRef.value.validate()
  timeRef.value.validate()
  rateRef.value.validate()
  gracePeriodsRef.value.validate()

  //Customised dialogs for Validation
  if (moneyRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con un valor de dinero. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (percentageRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con un valor de porcentaje. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (frequencyRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con alguna frecuencia ingresada. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (timeRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con algun valor relacionado al tiempo. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (rateRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con algun valor relacionado a tasas. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (gracePeriodsRef.value.hasError) {
    $q.notify({
      color: 'negative',
      message: 'Hubo un problema con los periodos de gracia. Verifique sus datos.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else if (!validateGracePeriods()) {
    $q.notify({
      color: 'negative',
      message: 'Un periodo de gracia de tipo T o P no puede ser dado en el ultimo periodo.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  } else {
    valid = true
  }
  return valid
}

const handleSubmit = async () => {
  console.log(VAT)
  console.log(INCOME_TAX)
  console.log(DAYS_PER_YEAR)
  const validData = validateInputFields()
  if (validData) {
    showLoading()
    const storableData = loadData()
    //Creates Report in Database
    await reportsService.create(storableData)
    calculateLeasingResults(storableData)
    calculateTotalResults(storableData)
    calculateRecurringCosts(storableData)
    calculateProfitabilityIndicators(storableData)
    generateSchedule(storableData)
  } else {
    $q.notify({
      color: 'negative',
      message: 'Hubo un error con los datos ingresados. Verifique nuevamente.',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    })
  }
}

//HELPER FUNCTIONS

//returns the data in a storable type (string-> number)
function loadData() {
  const data = {
    assetPrice: roundDecimal((currentReport.assetPrice)),
    leasingYears: parseInt(currentReport.leasingYears),
    paymentFrequency: currentReport.paymentFrequency.value,
    rateType: currentReport.rateType.value,
    rateValue: roundPercentage(parseFloat(currentReport.rateValue)),
    rateFrequency: currentReport.rateFrequency.value,
    capitalization: currentReport.capitalization.value === undefined ?
      "null" : currentReport.capitalization.value,
    buyback: roundPercentage((currentReport.buyback)),
    notaryFees: roundDecimal((currentReport.notaryFees)),
    registryFees: roundDecimal((currentReport.registryFees)),
    valuation: roundDecimal((currentReport.valuation)),
    studyCommission: roundDecimal((currentReport.studyCommission)),
    activationCommission: roundDecimal((currentReport.activationCommission)),
    regularCommission: roundDecimal((currentReport.regularCommission)),
    riskInsurance: roundPercentage((currentReport.riskInsurance)),
    rateKs: roundPercentage((currentReport.rateKs)),
    rateWacc: roundPercentage((currentReport.rateWacc)),
    userId: auth.user.id
  }
  return data
}
//rounds numbers given

function roundDecimal(x) {
  return +parseFloat(x).toFixed(2)
}

function roundPercentage(x) {
  return +parseFloat(x).toFixed(7)
}

function getDaysPerFrequency(frequency) {
  switch (frequency) {
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
function calculateRate(data) {
  const paymentFrequencyDays = getDaysPerFrequency(data.paymentFrequency)
  const rateFrequencyDays = getDaysPerFrequency(data.rateFrequency)
  if (data.rateType === 'nominal') {
    const capitalizationFrequency = getDaysPerFrequency(data.capitalization)
    const m = (rateFrequencyDays) / (capitalizationFrequency)
    const n = paymentFrequencyDays / (capitalizationFrequency)
    reportResults.periodEffectiveRate = calculatePeriodEffectiveRateWithNominalRate(data.rateValue, n, m)
  } else if (data.rateType === 'effective') {
    reportResults.periodEffectiveRate = calculatePeriodEffectiveRateWithEffectiveRate(data.rateValue, paymentFrequencyDays, rateFrequencyDays)
  } else {
    console.log("There was an error.")
  }
}

//CALCULATING TEP

//Nominal Rate
function calculatePeriodEffectiveRateWithNominalRate(rateValue, n, m) {
  let rate = roundPercentage((Math.pow(1 + ((rateValue / 100) / m), n) - 1) * 100)
  return rate
}

//Effective Rate
function calculatePeriodEffectiveRateWithEffectiveRate(rateValue, paymentFrequencyDays, rateFrequencyDays) {
  let rate = roundPercentage((Math.pow(1 + (rateValue / 100), (paymentFrequencyDays / rateFrequencyDays)) - 1) * 100)
  return rate
}

function round(number, decimals = 0) {
  let strNum = '' + number;
  let negCoef = number < 0 ? -1 : 1;
  let dotIndex = strNum.indexOf('.');
  let start = dotIndex + decimals + 1;
  let dec = Number.parseInt(strNum.substring(start, start + 1));
  let remainder = dec >= 5 ? 1 / Math.pow(10, decimals) : 0;
  let result = Number.parseFloat(strNum.substring(0, start)) + remainder * negCoef;
  return result.toFixed(decimals);
}


function calculateLeasingResults(data) {
  const paymentFrequencyDays = getDaysPerFrequency(data.paymentFrequency)
  reportResults.ivaValue = roundDecimal(data.assetPrice / (1 + VAT) * VAT)
  reportResults.assetValue = roundDecimal(data.assetPrice - reportResults.ivaValue)
  reportResults.leasingValue = roundDecimal(reportResults.assetValue + data.notaryFees + data.registryFees + data.valuation + data.studyCommission + data.activationCommission)
  calculateRate(data)
  reportResults.quotasPerYear = Math.round((DAYS_PER_YEAR / paymentFrequencyDays))
  reportResults.totalQuotas = Math.round(data.leasingYears * reportResults.quotasPerYear)
}

function calculateTotalResults(data) {
  reportResults.periodicCommissions = roundDecimal(data.regularCommission * reportResults.totalQuotas)
}

function calculateRecurringCosts(data) {
  reportResults.riskInsuranceValue = calculateRiskInsuranceValue(data.riskInsurance, data.assetPrice, reportResults.quotasPerYear)
}

function calculateRiskInsuranceValue(riskInsurance, assetPrice, quotasPerYear) {
  let value = roundDecimal((riskInsurance / 100 * assetPrice) / quotasPerYear)
  return value
}

function calculateProfitabilityIndicators(data) {

}

function generateSchedule(data) {
  let initialValue = reportResults.leasingValue
  let repayment = (reportResults.leasingValue / reportResults.totalQuotas)
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
  //VAN FLUJO BRUTO
  let grossFlowNpv = 0
  let rateGrossFlowNpv = (Math.pow(1 + (data.rateKs) / 100, getDaysPerFrequency(data.paymentFrequency) / DAYS_PER_YEAR) - 1)
  let grossFlowNpvPerQuota = 0
  let sumGrossFlowVpn = 0
  let quota = 0
  let finalValue = 0
  let interest = 0

  //VAN FLUJO NETO
  let netFlowNpv = 0
  let rateNetFlowNpv = (Math.pow(1 + (data.rateWacc) / 100, getDaysPerFrequency(data.paymentFrequency) / DAYS_PER_YEAR) - 1)
  let netFlowNpvPerQuota = 0
  let sumNetFlowVpn = 0

  //COLLECTIONS FOR TIR, TCEA
  let grossFlowCollection = [(-reportResults.leasingValue)]
  let netFlowCollection = [(-reportResults.leasingValue)]

  for (let i = 1; i <= reportResults.totalQuotas; i++) {
    interest = (initialValue * (reportResults.periodEffectiveRate / 100))
    totalInterest = totalInterest + interest
    totalRiskInsurance += reportResults.riskInsuranceValue
    let taxSaving = (interest + reportResults.riskInsuranceValue + data.regularCommission + depreciation) * INCOME_TAX

    if (totalGracePeriods.includes(i)) {
      repayment = 0
      quota = 0
      finalValue = initialValue + interest
      gp = 'T'
    } else if (partialGracePeriods.includes(i)) {
      repayment = 0
      quota = interest
      finalValue = initialValue
      gp = 'P'
    } else {
      gp = 'S'
      repayment = (initialValue / (reportResults.totalQuotas - i + 1))
      quota = (interest + repayment)
      finalValue = initialValue - repayment
    }

    totalRepayment = totalRepayment + repayment

    if (i === reportResults.totalQuotas) {
      buyback = (reportResults.assetValue * (data.buyback / 100))
      reportResults.buybackValue = roundDecimal(buyback)
      grossFlow = quota + reportResults.riskInsuranceValue + data.regularCommission + buyback
      ivaQuota = grossFlow * VAT
      ivaFlow = (grossFlow + ivaQuota)
      netFlow = (grossFlow - taxSaving)
    } else {
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

    grossFlowCollection.push(roundDecimal(grossFlow))
    netFlowCollection.push(roundDecimal(netFlow))

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


  function calculateIRR(flows) {
    let IRR = 0
    let NPV = 0
    let min = -1.0;
    let max = 11.0;
    do {
      IRR = (min + max) / 2;
      NPV = 0;
      for (let j = 0; j < flows.length; j++) {
        NPV += flows[j] / Math.pow((1 + IRR), j);
      }
      if (NPV > 0) {
        min = IRR;
      }
      else {
        max = IRR;
      }
      //stays in 15.69 forever
    } while (Math.abs(NPV) > 0.000000001);
    return IRR * 100;
  }

  reportResults.irrGrossFlow = roundPercentage(calculateIRR(grossFlowCollection))
  reportResults.irrNetFlow = roundPercentage(calculateIRR(netFlowCollection))
  reportResults.netFlowEar = roundPercentage((Math.pow(1 + (reportResults.irrNetFlow) / 100, DAYS_PER_YEAR / getDaysPerFrequency(data.paymentFrequency)) - 1) * 100)
  reportResults.grossFlowEar = roundPercentage((Math.pow(1 + (reportResults.irrGrossFlow) / 100, DAYS_PER_YEAR / getDaysPerFrequency(data.paymentFrequency)) - 1) * 100)
  reportResults.totalInterest = roundDecimal(totalInterest)
  reportResults.totalRepayment = roundDecimal(totalRepayment)
  reportResults.totalRiskInsurance = roundDecimal(totalRiskInsurance)
  reportResults.periodicCommissions = roundDecimal(data.regularCommission * reportResults.totalQuotas)
  reportResults.totalPayment = roundDecimal(totalInterest + totalRepayment + totalRiskInsurance + reportResults.periodicCommissions + reportResults.buybackValue)
  reportResults.grossFlowNpv = roundDecimal(reportResults.leasingValue - sumGrossFlowVpn)
  reportResults.netFlowNpv = roundDecimal(reportResults.leasingValue - sumNetFlowVpn)
}

//cleans the fields
function onReset() {
  name.value = null
  age.value = null
  nameRef.value.resetValidation()
  ageRef.value.resetValidation()
}

</script>

<template>
  <Header />
  <div class="w-auto m-auto my-6 font-dm-sans-regular">
    <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-4xl md:text-5xl pt-28">Leasing
    </div>
    <div class="font-dm-sans-bold text-xl">Ingrese los datos</div>
    <q-separator />
    <form @submit.prevent.stop="handleSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del prestamo</div>
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.assetPrice" type="number"
            label="Precio de venta del activo" :rules="moneyRules" />
          <q-input class="p-2" ref="timeRef" outlined v-model="currentReport.leasingYears" type="number"
            label="Número de años" :rules="timeRules" />
          <q-select class="p-2" ref="frequencyRef" outlined v-model="currentReport.paymentFrequency"
            :options="periodicals" label="Frecuencia de pago" :rules="frequencyRules" />
          <q-select class="p-2" ref="rateRef" outlined v-model="currentReport.rateType" :options="rateOptions"
            label="Tipo de tasa de interés" :rules="frequencyRules" />
          <q-select class="p-2" ref="frequencyRef" outlined v-model="currentReport.rateFrequency" :options="periodicals"
            label="Frecuencia de tasa" :rules="frequencyRules" />
          <q-select v-show="currentReport.rateType.value !== 'effective'" class="p-2" outlined
            v-model="currentReport.capitalization" :options="periodicals" label="Capitalización" />
          <q-input class="p-2" ref="percentageRef" outlined v-model="currentReport.rateValue" type="number"
            label="Porcentaje de tasa" :rules="percentageRules" />
          <q-input class="p-2" ref="percentageRef" outlined use-chips v-model="currentReport.buyback"
            label="Porcentaje de recompra" :rules="percentageRules" />
        </div>
        <div>
          <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos iniciales</div>
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.notaryFees" type="number"
            label="Costes notariales" :rules="moneyRules" />
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.registryFees" type="number"
            label="Costes registrales" :rules="moneyRules" />
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.valuation" type="number" label="Tasación"
            :rules="moneyRules" />
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.studyCommission" type="number"
            label="Comisión de estudio" :rules="moneyRules" />
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.activationCommission" type="number"
            label="Comisión de activación" :rules="moneyRules" />
          <q-input class="p-2" ref="gracePeriodsRef" outlined v-model="gracePeriods.total"
            label="Periodos de Gracia Totales" :rules="gracePeriodsRules" />
          <q-input class="p-2" ref="gracePeriodsRef" outlined v-model="gracePeriods.partial"
            label="Periodos de Gracia Parciales" :rules="gracePeriodsRules" />
        </div>
        <div>
          <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos de costes/gastos periódicos</div>
          <q-input class="p-2" ref="moneyRef" outlined v-model="currentReport.regularCommission" type="number"
            label="Comisión periódica" :rules="moneyRules" />
          <q-input class="p-2" ref="percentageRef" outlined v-model="currentReport.riskInsurance"
            label="Porcentaje de seguro de riesgo" :rules="percentageRules" />
        </div>
        <div>
          <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Datos del costo de oportunidad</div>
          <q-input class="p-2" ref="percentageRef" outlined v-model="currentReport.rateKs" label="Tasa de descuento Ks"
            :rules="percentageRules" />
          <q-input class="p-2" ref="percentageRef" outlined v-model="currentReport.rateWacc"
            label="Tasa de descuento WACC" :rules="percentageRules" />
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
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.assetValue }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="IGV" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.ivaValue }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Monto del Leasing" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.leasingValue }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Porcentaje de TEP" prefix="%" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.periodEffectiveRate }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Numero de cuotas por año" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.quotasPerYear }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Numero total de cuotas" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.totalQuotas }}</div>
          </template>
        </q-field>

      </div>
      <div>
        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados totales por ...</div>

        <q-field class="p-2" outlined label="Intereses" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.totalInterest }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Amortizacion del capital" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.totalRepayment }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Seguro contra todo riesgo" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.totalRiskInsurance }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Comisiones periodicas" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.periodicCommissions }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Recompra" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.buybackValue }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="Desembolso total" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.totalPayment }}</div>
          </template>
        </q-field>

      </div>
      <div>
        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Resultados costes/gastos periódicos</div>

        <q-field class="p-2" outlined label="Seguro riesgo" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.riskInsuranceValue }}</div>
          </template>
        </q-field>

      </div>
      <div>
        <div class="sub-heading-form font-dm-sans-bold p-2 my-2">Indicadores de rentabilidad</div>

        <q-field class="p-2" outlined label="TCEA Flujo Bruto" prefix="%" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.grossFlowEar }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="TCEA Flujo Neto" prefix="%" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.netFlowEar }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="VAN Flujo Bruto" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.grossFlowNpv }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="VAN Flujo Neto" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.netFlowNpv }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="TIR Flujo Bruto" prefix="%" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.irrGrossFlow }}</div>
          </template>
        </q-field>

        <q-field class="p-2" outlined label="TIR Flujo Neto" prefix="%" stack-label readonly>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ reportResults.irrNetFlow }}</div>
          </template>
        </q-field>

      </div>
    </div>
  </div>
  <div class="font-dm-sans-bold text-xl my-3">Cronograma</div>
  <q-separator />
  <div class="q-pa-md">
    <q-table class="my-sticky-header-table" title="Schedule for Leasing" :rows="rows" :columns="columns"
      row-key="periodo" flat bordered />
  </div>
  <Footer />
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