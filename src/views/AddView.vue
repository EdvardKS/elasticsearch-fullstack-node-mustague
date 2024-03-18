<script setup>

import { RouterLink, RouterView, stringifyQuery } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'

import BookMiniCards from '../components/BookMiniCards.vue'
import HelloWorld from '../components/HelloWorld.vue'
// let dataDatillos = ref([])

// let datillos = ref("")

</script>


<template>
    <header>
      <!-- <img alt="Edvard ElasticSerach Logo" class="logo" src="@/assets/descarga.png" width="125" height="125" /> -->
      <iconify-icon icon="skill-icons:elasticsearch-light" class="me-4" width="125"></iconify-icon>
      <div class="">
        <!-- <h2>{{ serverHello }}</h2> -->
        <HelloWorld msg="ElasticSearch!" otro='MOUSTACHE'/>
        
        <div id="accionador">
  
          <div id="formulario-post" class="form-scope">
              <div class="input-group input-group-lg">
                <input id="wordIndex" v-model="inputValue" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" @keyup="founcards">
                <!-- <button type="submit" class="input-group-text btn-outline-success" id="inputGroup-sizing-lg">Go!</button> -->
              </div>
          </div>
  
        </div>
      </div>
    </header>
  
    <RouterView />


<div v-if="showBookCards" class="card-container mt-5 pt-5">
  <div v-for="(datillo, index) in dataDatillos.value" :key="index" class="d-flexx ">
    <BookMiniCards
      :id="datillo._id"
      :index="datillo._index"
      :score="datillo._score"
      :author="datillo._source.author"
      :bookTitle="datillo._source.book_title"
      :iban="datillo._source.iban"
      :imgL="datillo._source.img_l"
      :imgM="datillo._source.img_m"
      :imgS="datillo._source.img_s"
      :publisher="datillo._source.publisher"
      :yearPublish="datillo._source.year_publish"
      :message="datillo._source.message" 
      class="bg-secondary"
    />
  </div>
</div>

    <!-- <h5>{{ this.inputValue }}</h5> -->    
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="latostada" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-success">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/010/161/526/small_2x/books-composition-3d-render-free-png.png" width="100px" class="rounded me-2" alt="...">
          <strong class="me-auto">Actualizado</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="latostadaquemada" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-danger">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/010/161/526/small_2x/books-composition-3d-render-free-png.png" width="100px" class="rounded me-2" alt="...">
          <strong class="me-auto">Error Actualizando</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
</template>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card-container .d-flexx {
  width: calc(50% - 10px); /* Ajusta el ancho según sea necesario */
  margin-bottom: 20px; /* Espacio entre filas */
}

</style>

<script>

export default {
  data() {
    return {
        // http://localhost:9200/productos-vicent/_doc/${docId}
      BASE_URL:  "http://localhost:9200/goodbot/",
      doc: "_doc/",
      search: "_search?q=iban=",
      inputValue: ref(''),
      showBookCards: ref(false) ,
      dataDatillos:ref([]),
      urlFetch: "",



    };
  },
  methods: {
    // http://localhost:9200/lib/_search?q=iban=385473974
    async founcards(){
      await fetch('http://localhost:9200/_search/template', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: "b_iban",
              params: {
                iban: this.inputValue 
              }
            })
          })
          .then(response => response.json())
        .then(data => {
            // console.log("Respuesta: " + data.datillos);
            this.dataDatillos.value = data.hits.hits; // Asigna el valor al ref dataDatillos
            console.log(data.hits.hits);

            if (JSON.stringify(data.hits.hits).length > 2) {
              this.showBookCards = true;
            } else {
              this.showBookCards = false;
            }

          })
        .catch(error => {
            // Manejar errores
            console.error('There was a problem with the fetch operation:', error);
        });
    }
  }
};

// import "/src/assets/funciones.js"

</script>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
