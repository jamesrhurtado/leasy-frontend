import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: {
            id: 88,
            currency: "PEN",
            daysPerYear: 360,
            valueAddedTax: 18,
            incomeTax: 30,
            userId: null
        }
    }),
    actions: {
        updateSettings(data) {
            console.log(data)
            this.settings = data
            console.log(this.settings)
        },
    }
})