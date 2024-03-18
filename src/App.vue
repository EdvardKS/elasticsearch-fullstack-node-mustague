<script setup>

import { RouterLink, RouterView, stringifyQuery } from 'vue-router'
import { ref, onMounted } from 'vue'

</script>


 
<template>
  
    
    
    <ul class="nav nav-tabs fixed-top bg-dark">
      <div class="d-flex justify-content-center align-items-center me-5 ">
        
        <img alt="Edvard ElasticSerach Logo" class="logo" src="@/assets/descarga.png" width="53" height="53" />
        <span>ElasticSearch</span>

      </div>
      <li class="nav-item">
        <!-- <a  href="#">Active</a> -->
        <RouterLink class="nav-link" aria-current="page" to="/"><iconify-icon icon="file-icons:moustache" width="30"></iconify-icon></RouterLink>
      </li>
      <li class="nav-item">
        <!-- <a class="nav-link" href="#">Link</a> -->
        <RouterLink class="nav-link" to="/add"><iconify-icon icon="line-md:edit"  style="color: #7fb8af" width="30"></iconify-icon></RouterLink>
      </li>
      <li class="nav-item">
        <!-- <a  href="#">Link</a> -->
        <RouterLink class="nav-link" to="/node"><iconify-icon icon="logos:nodejs-icon-alt" width="26"></iconify-icon></RouterLink>
      </li>
      <li class="nav-item">
        <!-- <a class="" aria-disabled="true">Disabled</a> -->
        <a class="nav-link" href="https://edvardks.com"><img src="@/assets/eks-BD-IA.png" width="35"></a> 
      </li>
    </ul>
    
    <RouterView />

  <!-- <script src="src/assets/funciones.js"></script> -->
</template>




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
</style>./views/ConsultaNode.vue
