<script>
export default {

}
</script>

<template>
    <div class="w-auto m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-4xl md:text-5xl">Leasing</div>
        <div class="font-dm-sans-bold">Ingrese los datos</div>
        <q-separator />
        <div>
            <div>
                <div class="sub-heading-form font-dm-sans-bold">Datos del prestamo</div>
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Precio de venta del activo" />
                <q-input class="p-2" outlined v-model="nYears" label="Número de años" />
                <q-input class="p-2" outlined v-model="paymentFrequency" label="Frecuencia de pago" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Tipo de tasa de interés" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Capitalización" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Porcentaje de tasa" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Porcentaje de recompra" />
            </div>
            <div>
                <div class="sub-heading-form font-dm-sans-bold">Datos de costes/gastos iniciales</div>
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Costes notariales" />
                <q-input class="p-2" outlined v-model="nYears" label="Costes registrales" />
                <q-input class="p-2" outlined v-model="paymentFrequency" label="Tasación" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión de estudio" />
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión de activación" />
            </div>
            <div>
                <div class="sub-heading-form font-dm-sans-bold">Datos de costes/gastos periódicos</div>
                <q-input class="p-2" outlined v-model="pVentaActivo" label="Comisión periódica" />
                <q-input class="p-2" outlined v-model="nYears" label="Porcentaje de seguro de riesgo" />
            </div>
            <div>
                <div class="sub-heading-form font-dm-sans-bold">Datos del costo de oportunidad</div>
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
    </div>
</template>

<style>

</style>