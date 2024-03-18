<script setup>

import { RouterLink, RouterView, stringifyQuery } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'

import BookCards from '../components/BookCards.vue'
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
  
          <div id="formulario-get" class="d-block form-scope">
            <select v-model="selectedOption" @change="checkOption" class="form-select" aria-label="Select search option">
              <option selected value="all">All</option>
              <option value="titulo">Titulo</option>
              <option value="autor">Autor</option>
              <option value="anyo">Año de publicación</option>
              <option value="editorial">Editorial</option>
            </select>
            <div class="input-group input-group-lg mt-2">
  
              <input v-model="inputValue" type="text" class="form-control">
              <input v-model="otroAnyo" type="text" id="elotro" class="form-control" v-show="selectedOption === 'anyo'">
              <button type="button" @click="buscar" class="input-group-text btn-outline-success" id="inputGroup-sizing-lg">Go!</button>
            </div>
          </div>
  
          <form id="formulario-post" action="POST" class="d-none form-scope">
              <div class="input-group input-group-lg">
                <input id="wordIndex" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
                <button type="submit" class="input-group-text btn-outline-success" id="inputGroup-sizing-lg">Insertar!</button>
              </div>
          </form>
  
        </div>
        <nav class="d-flex justify-content-center my-2">
          <button id="boton-get" class="btn btn-outline-primary mx-1">GET</button>
          <button id="boton-put" class="btn btn-outline-primary mx-1">PUT</button>
          <!--<button id="boton-edit" class="btn btn-outline-primary mx-1">EDIT</button>-->
          <!--<button id="boton-delete" class="btn btn-outline-primary mx-1">DELETE</button>-->
           <!--<button class="btn btn-outline-primary">GET</button> -->
          <!-- <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink> -->
        </nav>
      </div>
    </header>
  
    <RouterView />


<div v-if="showBookCards">
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="ms-5 carousel-inner">
      <div v-for="(datillo, index) in dataDatillos.value" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
        <BookCards
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
        />
      </div>
    </div>

    <a class="carousel-control-prev pe-5" href="#carouselExampleControls" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
  </div>
</div>
    
    
    <!-- <script src="src/assets/funciones.js"></script> -->
</template>



<script>

export default {
  data() {
    return {
      BASE_URL:  "http://localhost:9200/goodbot/_search/template",
      selectedOption: ref('all'), 
      inputValue: ref('Edvard'),
      otroAnyo: ref('2024'),
      showInputField: ref(false),
      showBookCards: ref(false) ,
      dataDatillos:ref([]),
      id:ref("b_all"),
      params:""
    };
  },
  methods: {

    async llamadaNodo(){
      console.log("Body: "+JSON.stringify({id: this.id,params: this.params}));

      await fetch('http://localhost:9200/_search/template', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.id, params: this.params})
          })
          .then(response => response.json())
          .then(data => {
            this.dataDatillos.value = data.hits.hits; 
            console.log(this.dataDatillos.value);
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
    },


    buscar() {
      switch (this.selectedOption) {
        case 'all':
          this.id = "b_all"
          this.params = {query:this.inputValue}
          this.llamadaNodo()
          break;

        case 'titulo':
          this.id = "b_title"
          this.params = {title:this.inputValue}
          this.llamadaNodo()
          break;

        case 'autor':
          this.id = "b_author"
          this.params = {author:this.inputValue}
          this.llamadaNodo()
          break;

        case 'anyo':
          this.id = "b_years"
          this.params = {start_year: this.inputValue,end_year: this.otroAnyo}
          this.llamadaNodo()
          break;

        case 'editorial':
          this.id = "b_pub"
          this.params = {publisher:this.inputValue}
          this.llamadaNodo()
          break;

        default:
          alert("Fallo en la selección del DropDown. Presiona F5.")
          break;
      }
    }
  }
};


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
