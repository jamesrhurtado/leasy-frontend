import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: {
            id: null,
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
        setId(id){
            this.settings.id = id;
        },
        setUserId(userId){
            this.settings.userId = userId
        },
        setCurrency(currency){
            this.settings.currency = currency
        },
        setDaysPerYear(daysPerYear){
            this.settings.daysPerYear = daysPerYear
        },
        setValueAddedTax(valueAddedTax){
            this.settings.valueAddedTax = valueAddedTax
        },
        setIncomeTax(incomeTax){
            this.settings.incomeTax = incomeTax
        }
    }
})