import {ref, onMounted, computed} from 'vue'

export default function useCripto() {

    const criptomonedas = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', texto: 'Peso Mexicano' },
        { codigo: 'EUR', texto: 'Euro' },
        { codigo: 'GBP', texto: 'Libra Esterlina' },
    ])
    const cotizacion = ref({})
    const cargado = ref(false)


    onMounted(() => {
        //consumir api
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        fetch(url)
          .then(respuesta => respuesta.json())
          //consumo el campo Data del json
          .then(({ Data }) => criptomonedas.value = Data)
          .catch()
    })

    const obtenerCotizacion = async (cotizar) => {
        cargado.value = true
        cotizacion.value = {}
        try {
          const { monedas, criptomoneda } = cotizar
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${monedas}`
      
          const respuesta = await fetch(url)
          const data = await respuesta.json()
          cotizacion.value = data.DISPLAY[criptomoneda][monedas];
          
      
        } catch (error) {
          console.log(error);
        } finally{
          cargado.value = false
        }
        
    }

    const mostrarResultado = computed(() => {
        return Object.values(cotizacion.value).length > 0
    });

    return {
        monedas,
        criptomonedas,
        cargado,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}