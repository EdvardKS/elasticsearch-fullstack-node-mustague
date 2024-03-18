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
  methods: {
    updateBookTitle(value) {
      this.$emit('update:bookTitle', value);
    },
    updateAuthor(value) {
      this.$emit('update:author', value);
    },
    updatePublisher(value) {
      this.$emit('update:publisher', value);
    },
    updateYearPublish(value) {
      this.$emit('update:yearPublish', value);
    },
    updateIban(value) {
      this.$emit('update:iban', value);
    },
    updateId(value) {
      this.$emit('update:id', value);
    },
    update_imgL(value) {
      this.$emit('update:_imgL', value);
    },
    update_imgM(value) {
      this.$emit('update:_imgM', value);
    },
    update_imgS(value) {
      this.$emit('update:_imgS', value);
    },
    // update_message(value) {
    //   this.$emit('update:_message', value);
    // },
    // update_timestamp(value) {
    //   this.$emit('update:_timestamp', value);
    // },
    async saveUpdate(){
        const bookTitle = document.getElementById('tit').value;
        const author = document.getElementById('aut').value;
        const publisher = document.getElementById('edi').value;
        const yearPublish = document.getElementById('any').value;
        const iban = document.getElementById('ibn').value;

        
        const _id = document.getElementById('_id').value;
        const _imgL = document.getElementById('_imgL').value;
        const _imgM = document.getElementById('_imgM').value;
        const _imgS = document.getElementById('_imgS').value;
        // const _message = document.getElementById('_message').value;
        // const _timestamp = document.getElementById('_timestamp').value;

        const data = {
            book_title: bookTitle,
            author: author,
            publisher: publisher,
            year_publish: yearPublish,
            iban: iban,
            img_l:_imgL,
            img_m:_imgM,
            img_s:_imgS,
            // message:_message,
            // timestamp:_timestamp,
        };
        
        console.log("saveUpdate:\n"+JSON.stringify(data));

        await fetch(`http://localhost:9200/goodbot/_doc/${_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
          })
          .then(response => response.json())
        .then(data => {
            // console.log(data);
            const toastTrigger = document.getElementById(this.imgS)
            const toastLiveExample = document.getElementById('latostada')
            console.log(toastTrigger);
            console.log(toastLiveExample);
            if (toastTrigger) {
              const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
              toastTrigger.addEventListener('click', () => {
                toastBootstrap.show()
              })
            }
          })
        .catch(error => {
            // Manejar errores
            console.error('There was a problem with the fetch operation:', error);
            const toastTrigger = document.getElementById(this.imgS)
            const toastLiveExample = document.getElementById('latostadaquemada')
            console.log(toastTrigger);
            console.log(toastLiveExample);
            if (toastTrigger) {
              const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
              toastTrigger.addEventListener('click', () => {
                toastBootstrap.show()
              })
            }
        });


}
  }
}




</script>
<!-- '@/assets/default.jpg' -->

<template>
    <div class="card m-2"  >
        <img :src="imgS" class="card-img-top" height="200em" :alt="bookTitle" >
        <div class="card-body bg-secondary">
            <h5 class="card-title text-center fs-6">{{bookTitle}}</h5>
        </div>
        <div class="d-flex text-center bg-secondary">
            <button type="button" class="btn btn-primary w-50 m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <iconify-icon icon="uil:edit"></iconify-icon>
            </button>
            <button type="button" class="btn btn-danger w-50 m-2" >
                <iconify-icon icon="fa6-regular:trash-can" ></iconify-icon>
            </button>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header bg-secondary">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edición de libros</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-dark d-flex flex-column bg-secondary">

                        <span class="ms-3 mt-3">Titulo:</span>
                        <input id="tit" class="text-center" :value="bookTitle" @input="updateBookTitle($event.target.value)">
                        <span class="ms-3 mt-3">Autor:</span>
                        <input id="aut" class="text-center" :value="author" @input="updateAuthor($event.target.value)">
                        <span class="ms-3 mt-3">Editorial:</span>
                        <input id="edi" class="text-center" :value="publisher" @input="updatePublisher($event.target.value)">
                        <span class="ms-3 mt-3">Año de publicación:</span>
                        <input id="any" class="text-center" :value="yearPublish" @input="updateYearPublish($event.target.value)">
                        <span class="ms-3 mt-3">IBAN:</span>
                        <input id="ibn" class="text-center " disabled :value="iban" @input="updateIban($event.target.value)">
                        <input id="_id" class="text-center d-" disabled :value="id" @input="updateId($event.target.value)">
                        <input id="_imgL" class="text-center d-" disabled :value="imgL" @input="update_imgL($event.target.value)">
                        <input id="_imgM" class="text-center d-" disabled :value="imgM" @input="update_imgM($event.target.value)">
                        <span class="ms-3 mt-3">Imagen S (La que se muestra en está vista):</span>
                        <input id="_imgS" class="text-center d-" :value="imgS" @input="update_imgS($event.target.value)">
                        <!-- <input id="_message" class="text-center d-" disabled :value="message" @input="update_message($event.target.value)">
                        <input id="_timestamp" class="text-center d-" disabled :value="timestamp" @input="update_timestamp($event.target.value)"> -->

                    </div>
                    <div class="modal-footer bg-secondary">
                        <button type="button" class="btn btn-dark"  data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="saveUpdate" data-bs-dismiss="modal" :id=imgS>Actualizar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>




  </template>
  
  