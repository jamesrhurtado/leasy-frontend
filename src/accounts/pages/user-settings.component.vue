<script setup>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import {SettingsService} from '@/accounts/services/settings.service.js'
import { useSettingsStore } from '../../stores/settings.store.js';
import { useAuthStore } from '../../stores/auth.store.js';
import Header from '@/components/header.component.vue'
import Footer from '@/components/footer.component.vue'


const SettingsStore = useSettingsStore()
// const settings  = computed(() => SettingsStore.settings);
let settings  = SettingsStore.settings

const UserStore = useAuthStore()
const user = UserStore.user
const $q = useQuasar()
const currency = ref("")
const settingsService = new SettingsService()


//fetching user settings from Backend
const fetchSavedSettings = async () => {
  const currentSettings = await settingsService.getByUserId(user.id)
  console.log(user.id)
  if(!currentSettings){
    console.log("didnt found data in db! creating...")
    //create settings with default values
    await settingsService.create(settings)
    SettingsStore.setUserId(user.id)
  }else{
    console.log("found data in db! updating...")
    //update store with settings data got from Backend
    SettingsStore.updateSettings(currentSettings.data)
    SettingsStore.setId(currentSettings.data.id)
    SettingsStore.setUserId(user.id)
  }
}

fetchSavedSettings()

const updateSavedSettings = async () => {
  settings  = SettingsStore.settings
  await settingsService.update(settings.id, settings)
}

function promptCurrency() {
  $q.dialog({
    title: 'Editar moneda',
    message: 'Seleccione la moneda que desea',
    options: {
      type: 'radio',
      model: 'opt1',
      items: [
        { label: 'Dólar americano (USD)', value: 'USD', color: 'secondary' },
        { label: 'Euro (EUR)', value: 'EUR', color: 'secondary' },
        { label: 'Sol peruano (PEN)', value: 'PEN', color: 'secondary' }
      ]
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
    SettingsStore.setCurrency(data)
    updateSavedSettings();
  })
}

function promptNDaysPerYear() {
  $q.dialog({
    title: 'Editar días por año',
    message: 'Seleccione el numero de días por año',
    options: {
      type: 'radio',
      model: 'opt1',
      items: [
        { label: '360 días', value: '360', color: 'secondary' },
        { label: '365 días', value: '365', color: 'secondary' }
      ]
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
    SettingsStore.setDaysPerYear(data)
    updateSavedSettings();
  })
}

function promptValueAddedTax() {
  $q.dialog({
    title: 'Editar IGV',
    message: 'Escriba el nuevo valor (en %)',
    prompt: {
      model: '',
      isValid: val => val > 0, // here is the magic
      type: 'number' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
    SettingsStore.setValueAddedTax(data)
    updateSavedSettings();
  })
}

function promptIncomeTax() {
  $q.dialog({
    title: 'Editar IR',
    message: 'Escriba el nuevo valor (en %)',
    prompt: {
      model: '',
      isValid: val => val > 0, // << here is the magic
      type: 'number' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    console.log('>>>> OK, received', data)
    SettingsStore.setIncomeTax(data)
    updateSavedSettings();
  })
}

</script>

<template>
  <Header />
    <div class="grid shadow-md w-auto m-auto my-3 pt-28 font-dm-sans-regular">
        <div class="heading heading-color font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Configuraciones
        </div>
        <div class="grid grid-cols-2 justify-center">
            <q-input class="p-4 m-2" outlined v-model="settings.currency" hint="Moneda" readonly />
            <q-btn class="max-h-7 self-center max-w-[50%] justify-self-center" label="Editar" color="primary" @click="promptCurrency" />
        </div>

        <div class="grid grid-cols-2 justify-center">
            <q-input class="p-4 m-2" outlined v-model="settings.daysPerYear" hint="Número de dias por año" readonly />
            <q-btn class="max-h-7 self-center max-w-[50%] justify-self-center" label="Editar" color="primary" @click="promptNDaysPerYear" />
        </div>

        <div class="grid grid-cols-2 justify-center">
            <q-input class="p-4 m-2 mb-6" outlined v-model="settings.valueAddedTax" hint="Impuesto general a las ventas (IGV)" readonly />
            <q-btn class="max-h-7 self-center max-w-[50%] justify-self-center" label="Editar" color="primary" @click="promptValueAddedTax" />
        </div>

        <div class="grid grid-cols-2 justify-center">
            <q-input class="p-4 m-2 mb-6" outlined v-model="settings.incomeTax" hint="Impuesto general a la renta (IR)" readonly />
            <q-btn class="max-h-7 self-center max-w-[50%] justify-self-center" label="Editar" color="primary" @click="promptIncomeTax" />
        </div>
    </div>
    <Footer />
    
</template>


<style>

</style>