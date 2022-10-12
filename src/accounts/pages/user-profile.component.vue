<script>
export default {

}

</script>


<template>

  <div class="grid shadow-md w-96 m-auto my-6 font-dm-sans-regular">
        <div class="heading heading-color my-3 font-dm-sans-bold text-center self-center text-2xl md:text-3xl">
            Mi perfil
        </div>
        <q-input class="p-4 m-2" outlined v-model="name" hint="Nombre" :dense="dense" readonly />
        <q-input class="p-4 m-2" outlined v-model="lastName" hint="Apellidos" :dense="dense" readonly />
        <q-input class="p-4 m-2 mb-6" outlined v-model="email" hint="Correo Electronico" :dense="dense" readonly />
    </div>
</template>

<style>

</style>