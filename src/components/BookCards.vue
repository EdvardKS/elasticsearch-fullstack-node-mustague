<script>
export default {
  props: {
    id: String,
    index: String,
    score: Number,
    timestamp: String,
    author: String,
    bookTitle: String,
    iban: Number,
    imgL: String,
    imgM: String,
    imgS: String,
    publisher: String,
    yearPublish: String,
    message: String
  },
  mounted() {
    // Imprime todas las propiedades recibidas por consola
    // console.log("ID:", this.id);
    // console.log("Index:", this.index);
    // console.log("Score:", this.score);
    // console.log("Timestamp:", this.timestamp);
    // console.log("Author:", this.author);
    // console.log("Book Title:", this.bookTitle);
    // console.log("IBAN:", this.iban);
    // console.log("Img L:", this.imgL);
    // console.log("Img M:", this.imgM);
    // console.log("Img S:", this.imgS);
    // console.log("Publisher:", this.publisher);
    // console.log("Year Publish:", this.yearPublish);
    // console.log("Message:", this.message);
  }
}
// console.log("e");
</script>
<!-- '@/assets/default.jpg' -->

<template>
    <div class="card ms-5 " style="width: 26rem;">
        <img :src="imgL" class="card-img-top" :alt="bookTitle" style="width: 100%; height: 500px">
        <!-- <img :src="imgM" class="card-img-top" :alt="bookTitle">
        <img :src="imgS" class="card-img-top" :alt="bookTitle"> -->
        <div class="card-body bg-secondary">
            <h5 class="card-title text-center m-2">{{bookTitle}}</h5>
            <h5 class="card-title">Autor: {{author}}</h5>
            <h5 class="card-title">Editorial: {{publisher}}</h5>
            <h5 class="card-title">Año Publicación: {{yearPublish}}</h5>
            <h5 class="card-title">IBAN: {{iban}}</h5>
            
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
    </div>
  </template>
  
  
  <style scoped>
  /* Estilos opcionales para el carousel */
  </style>
  