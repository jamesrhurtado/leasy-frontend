<script setup>
import { useRouter, RouterLink } from "vue-router";
  // animation
  let ubicacionPrincipal  = window.pageYOffset;
  window.onscroll = function() {
      let Desplazamiento_Actual = window.pageYOffset;
      if(ubicacionPrincipal >= Desplazamiento_Actual){
          document.getElementById('header_website').style.top = '0';
          document.getElementById('header_website').style.transition = 'top 1s';
      }
      else{
          document.getElementById('header_website').style.top = '-100px';
          document.getElementById('header_website').style.transition = 'top 1s';
      }
      ubicacionPrincipal = Desplazamiento_Actual;
  }

</script>


<template>
  <header id="header_website" class="header_">

    <div class="block_leasy">
        <a href="#presentation_website" class="leasy">leasy</a>
    </div>

    <div class="block_derecha">
      <RouterLink to="/sign-in" id="inicia_sesion" class="iniciar_sesion">Iniciar sesión</RouterLink>
        <div class="block_registrarse">
            <RouterLink to="/sign-up" id="registrarse" class="registrarse">Registrarse</RouterLink>
        </div>
    </div>

  </header>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=DM+Sans&display=swap');

a{text-decoration: none; cursor: pointer;}
.header_{
    position: fixed;/*fixed */
    /* top:0; */
    top: 0;
    right: 0;
    left: 0;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 20px;
    background: #fff;
    border:none;
    z-index: 1;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
}

.leasy{
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
.block_leasy,.block_derecha{display: flex; align-items: center; gap: 20px;}

.block_registrarse{background: #5BB5A2; padding: 12px; border-radius: 10px;}

.iniciar_sesion{
  width: 105px;
  height: 18px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  letter-spacing: -0.03em;

  color: #5BB5A2;
  
  flex: none;
  order: 0;
  flex-grow: 0;
}

.registrarse{
  width: 80px;
  height: 15px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 100%;
  /* identical to box height, or 15px */

  color: #FFFFFF;

  flex: none;
  order: 0;
  flex-grow: 0;
}

</style>