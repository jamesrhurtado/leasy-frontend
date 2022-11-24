<script>
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'
import { ReportsService } from '@/reports/services/reports.service.js'
import { useAuthStore } from '../../stores/auth.store.js';
import Header from '@/components/header.component.vue'
import Footer from '@/components/footer.component.vue'
export default {
    components: {
        Header,
        Footer
    },
    setup() {
        const $q = useQuasar()
        let timer
        onBeforeUnmount(() => {
            if (timer !== void 0) {
                clearTimeout(timer)
                $q.loading.hide()
            }
        })
    },
    data() {
        return {
            reports: [],
            reportsService: null,
            UserStore: null,
            auth: null
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData: function () {
            this.UserStore = useAuthStore()
            this.auth = this.UserStore.user
            this.reportsService = new ReportsService()
            this.showLoading()
            this.reportsService.getAllByUserId(this.auth.user.id).then(response => { this.reports = response.data })
        },
        showLoading: function () {
            this.$q.loading.show({
                message: 'Cargando sus reportes. Por favor espere...'
            })
            this.timer = setTimeout(() => {
                this.$q.loading.hide()
                this.timer = void 0
            }, 2500)
        },
    }
}
</script>

<template>
    <Header />
    <div class="w-auto m-auto my-6 font-dm-sans-regular pt-28">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-4xl md:text-5xl">Historial
        </div>
        <q-separator />
        <div v-if="reports.length === 0">
            <div class="q-pa-md q-gutter-sm">
                <q-banner inline-actions rounded class="bg-secondary text-white">
                    No cuenta con ningun reporte realizado.

                    <template v-slot:action>
                        <q-btn flat label="Ir a calculadora" />
                        <q-btn flat label="Cerrar" />
                    </template>
                </q-banner>
            </div>
        </div>
        <div v-for="report, index in reports" v-bind:key="report.id">
            <div class="my-8 text-2xl font-semibold"> Reporte numero: {{ index + 1 }} </div>
            <div class="q-gutter-md bg-slate-100 rounded-2xl">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <div class="font-dm-sans-bold p-2 my-2">Datos del prestamo</div>
                        <q-field filled class="p-2 pt-4" hint="Precio de venta del activo" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.assetPrice }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Número de años" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.leasingYears }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Frecuencia de pago" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.paymentFrequency }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Tipo de tasa de interés" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.rateType }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Frecuencia de tasa" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.rateFrequency }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" v-show="report.rateType !== 'effective'" hint="Capitalización"
                            readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.capitalization }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Porcentaje de tasa" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.rateValue }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Porcentaje de recompra" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.buyback }}</div>
                            </template>
                        </q-field>
                    </div>
                    <div>
                        <div class="font-dm-sans-bold p-2 my-2">Datos de costes/gastos iniciales</div>

                        <q-field filled class="p-2 pt-4" hint="Costes notariales" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.notaryFees }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Costes registrales" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.registryFees }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Tasación" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.valuation }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Comisión de estudio" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.studyCommission }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Comisión de activación" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.activationCommission }}</div>
                            </template>
                        </q-field>

                    </div>
                    <div>
                        <div class="font-dm-sans-bold p-2 my-2">Datos de costes/gastos periódicos</div>

                        <q-field filled class="p-2 pt-4" hint="Comisión periódica" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.regularCommission }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Porcentaje de seguro de riesgo" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.riskInsurance }}</div>
                            </template>
                        </q-field>

                    </div>
                    <div>
                        <div class="font-dm-sans-bold p-2 my-2">Datos del costo de oportunidad</div>

                        <q-field filled class="p-2 pt-4" hint="Tasa de descuento Ks" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.assetPrice }}</div>
                            </template>
                        </q-field>

                        <q-field filled class="p-2 pt-4" hint="Tasa de descuento WACC" readonly>
                            <template v-slot:control>
                                <div class="self-center full-width no-outline">{{ report.assetPrice }}</div>
                            </template>
                        </q-field>
                    </div>
                    <div class="m-4">
                        <q-btn color="red" label="Eliminar reporte" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
body {
    display: block;
}
</style>