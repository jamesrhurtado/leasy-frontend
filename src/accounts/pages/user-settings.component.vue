<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    function promptCurrency () {
      $q.dialog({
        title: 'Cambiar moneda',
        message: '¿Cuál es la nueva moneda que desea?',
        options: {
          type: 'radio',
          model: 'opt1',
          items: [
            { label: 'Dólar americano', value: 'Dólar americano', color: 'secondary' },
            { label: 'Euro', value: 'Euro', color: 'secondary'},
            { label: 'Sol peruano', value: 'Sol peruano', color: 'secondary' }
          ]
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
      })
    }

    return {
      promptCurrency
    }
  }
}
</script>

<template>
    <div class="grid shadow-md w-96 m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Configuraciones
        </div>
        <q-input class="p-4 m-2" outlined v-model="currency" hint="Moneda" :dense="dense" readonly />
        <q-btn label="Editar" color="primary" @click="promptCurrency" />
        <q-input class="p-4 m-2" outlined v-model="nDaysPeryear" hint="Número de dias por año" :dense="dense" readonly />
        <q-input class="p-4 m-2 mb-6" outlined v-model="valueAddedTax" hint="Impuesto general a las ventas (IGV)" :dense="dense" readonly />
        <q-input class="p-4 m-2 mb-6" outlined v-model="incomeTax" hint="Impuesto general a la renta (IR)" :dense="dense" readonly />

    </div>
  
</template>


<style>

</style>