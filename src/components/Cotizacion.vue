<script setup>
    defineProps(["cotizacion"])
</script>
<template>
    <!-- mostrar resultados -->
    <div  class="contenedor-resultado">
        <h2>Cotizacion</h2>
        <div class="resultado">
          <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" alt="imagen cripto">
          <div>
            <p>El precio es de:  <span>{{ cotizacion.PRICE }}</span></p>
            <p>Precio mas alto del dia:  <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>precio mas bajo del dia:  <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>Variacion últimas 24 horas:  <span>{{ cotizacion.CHANGEPCT24HOUR }}</span></p>
            <p>Variacion últimas 24 horas:  <span>{{ cotizacion.LASTUPDATE }}</span></p>
          </div>
        </div>
    </div>
</template>

<style scoped></style>