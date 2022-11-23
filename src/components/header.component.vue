<script setup>
import { useQuasar } from 'quasar'
import { useRouter, RouterLink, routeLocationKey } from "vue-router";
import { useAuthStore } from '@/stores/auth.store.js';
const authStore = useAuthStore()
const router = useRouter();
const $q = useQuasar()

const handleLogOut = () => {
  authStore.logout()
  router.push("/sign-in");
  $q.notify({
    color: 'positive',
    message: 'Se ha cerrado la sesion.',
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    ]
  })
}
let ubicacionPrincipal = window.pageYOffset;
// let headerMaster = document.getElementById('headerApp');

window.onscroll = function () {
  let Desplazamiento_Actual = window.pageYOffset;
  if (ubicacionPrincipal >= Desplazamiento_Actual) {
    document.getElementById('headerApp').style.top = '0';
  }
  else {
    document.getElementById('headerApp').style.top = '-100px';
  }
  ubicacionPrincipal = Desplazamiento_Actual;
}

</script>

<template>
  <header id="headerApp" class="blockHeaderApp">

    <RouterLink to="/" class="blockLeasy">
      <div class="leasy">leasy</div>
    </RouterLink>

    <div class="blockControl">
      <div class="controlApp">
        <RouterLink to="/calculator" id="RouCalculator" class="ruta">Calculadora</RouterLink>
      </div>
      <div class="controlApp">
        <RouterLink to="/reports" id="RouHistorial" class="ruta">Historial</RouterLink>
      </div>
      <div class="controlApp">
        <RouterLink to="/settings" id="RouSetting" class="ruta">Configuraciones</RouterLink>
      </div>
      <div class="controlApp">
        <RouterLink to="/my-profile" id="RouProfile" class="ruta">Mi perfil</RouterLink>
      </div>
      <div class="controlApp" @click="handleLogOut">
        <RouterLink to="/sign-in" id="RouSingIn" class="ruta">Cerrar Sesión</RouterLink>
      </div>
    </div>
  </header>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');

.blockHeaderApp {
  position: fixed;
  /*absolute */
  /*top:0; */
  z-index: 2;
  right: 0;
  left: 0;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 20px;
  background: #ffffff;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  /*delete*/
  transition: top 1s;
}

.leasy {
  width: 78px;
  height: 32px;
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #5BB5A2;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.blockLeasy,
.blockControl {
  display: flex;
  align-items: center;
  gap: 20px;
}

.controlApp {
  background: #fff;
  padding: 12px;
  border-radius: 10px;
}

.controlApp:hover {
  background: rgb(248, 248, 248);
  padding: 12px;
  border-radius: 10px;
}

.ruta {
  width: 105px;
  height: 18px;
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: black;
  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>