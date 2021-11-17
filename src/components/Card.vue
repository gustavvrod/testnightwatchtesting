<template>
  <v-container>
    <v-row justify="space-around">
      <v-col
        lg="3"
        xl="2"
        md="5"
        cols="10"
        v-for="(juego, index) in juegos"
        :key="index"
      >
        <v-card class="mx-auto">
          <v-img
            class="white--text align-end"
            height="300px"
            :src="juego.background_image"
          >
            <v-card-title class="font-weight-bold">
              {{ juego.name }}
            </v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>Rating: {{ juego.rating }}</div>

            <div>Released: {{ juego.released }}</div>

            <div>Updated: {{ juego.updated }}</div>
          </v-card-text>

          <v-btn
            id="botonOpinar"
            class="mx-4"
            color="teal lighten-2"
            dark
            @click="showModal(juego.name)"
          >
            Opinar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <!-- DIALOG -->
    <v-card-actions>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Escribe tu opinion para el juego:
                {{ nombreJuegoTemporal }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      id="nombre"
                      label="Nombre*"
                      v-model="formLocal.nombre"
                      required
                      autofocus
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      id="opinion"
                      v-model="formLocal.opinion"
                      label="Ingrese su opinión"
                      hint="Recuerda opinar sin insultos ni descalificaciones."
                      placeholder="Danos tu opinión"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>* indica un campo requerido obligatoriamente</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                id="cancelDialog"
                color="blue darken-1"
                text
                @click="dialog = false"
              >
                Cerrar
              </v-btn>
              <v-btn
                id="submitOpinion"
                color="blue darken-1"
                text
                @click="onSubmit"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card-actions>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Card",
  data() {
    return {
      nombreJuegoTemporal: "",
      mensajeModal: "",
      formLocal: {
        juego: "unjuego",
        nombre: "unnombre",
        opinion: "unaopinion",
      },
      dialog: false,
    };
  },
  computed: {
    ...mapState(["juegos", "opinion", "loading"]),
  },
  mounted() {
    if (localStorage.juego) {
      this.formLocal.juego = localStorage.juego;
    }
    if (localStorage.nombre) {
      this.formLocal.nombre = localStorage.nombre;
    }
    if (localStorage.opinion) {
      this.formLocal.opinion = localStorage.opinion;
    }
  },
  methods: {
    showModal(nombreJuego) {
      this.nombreJuegoTemporal = nombreJuego;
      this.formLocal.juego = nombreJuego;
      this.organizarMensaje(nombreJuego);

      console.log("se muestra el dialogo");
    },
    organizarMensaje(unNombreJuego) {
      this.mensajeModal = "Escribe tu opinión para el juego: ";
      this.mensajeModal += unNombreJuego;
      this.dialog = true;
    },
    hideModal() {
      this.dialog = false;
    },
    onSubmit(event) {
      event.preventDefault();

      let miOpinion = this.formLocal;
      console.log(JSON.stringify(miOpinion));

      let elNombreJuego = localStorage.juego;
      console.log(elNombreJuego);

      let elNombreAutor = localStorage.nombre;
      console.log(elNombreAutor);

      let laOpinion = localStorage.opinion;
      console.log(laOpinion);

      let enviarOpinion = {
        juego: localStorage.juego,
        nombre: localStorage.nombre,
        opinion: localStorage.opinion,
      };
      this.$store.dispatch("agregarOpinion", enviarOpinion);
      console.log("se envian datos de la opinion");
      this.hideModal();
      this.formLocal.juego = "";
      this.formLocal.nombre = "";
      this.formLocal.opinion = "";
    },
  },
};
</script>
