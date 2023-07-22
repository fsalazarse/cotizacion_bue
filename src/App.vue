<script setup>
import { ref, reactive} from 'vue';
import spinner from './components/spinner.vue'
import Alerta from './components/Alerta.vue'
import useCripto from './composables/useCripto'
import Cotizacion from './components/Cotizacion.vue'

const { monedas, criptomonedas, cargado, cotizacion, obtenerCotizacion,
       mostrarResultado} = useCripto()

const error = ref('')

const cotizar = reactive({
  monedas: '',
  criptomoneda: ''
})

const cotizarCripto = () => {
  //Validar que cotizar este lleno
  if (Object.values(cotizar).includes('')) {
    error.value = "Todos los campos son obligatorios";
    return
  }
  error.value = ""
  obtenerCotizacion(cotizar)
}

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizadot de <span>CriptoMonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>

      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda</label>

          <select id="moneda" v-model="cotizar.monedas">

            <option value="">-- Selecciona --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>

          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda</label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="">-- Selecciona --</option>
            <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name">
              {{ criptomoneda.CoinInfo.FullName }}
            </option>

          </select>
        </div>

        <input type="submit" value="Cotizar" />
      </form>
      
      <spinner v-if="cargado" />
      <Cotizacion v-if="mostrarResultado" 
        :cotizacion="cotizacion"
      />
      
    </div>
  </div>
</template>

<style scoped></style>
