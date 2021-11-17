<template>
  <v-data-table
    :headers="headers"
    :items="opiniones"
    sort-by="nombre"
    class="elevation-1 mx-12"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5"
                >Editar opinion del juego {{ formLocal.juego }}</span
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formLocal.nombre"
                      label="Nombre del usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formLocal.opinion"
                      label="Opinión a editar"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="onSubmit">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        id="botonEditar"
        text
        class="mr-2 teal lighten-2"
        dark
        @click="showModal(item)"
      >
        Editar
      </v-btn>
      <v-btn text class="red lighten-1" dark @click="eliminar(item)">
        Eliminar
      </v-btn>
    </template>
    <template v-slot:no-data> No existen datos para mostrar </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Juego", value: "juego" },
      { text: "Opinion", value: "opinion" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    formLocal: [
      {
        nombre: "",
        juego: "",
        opinion: "",
      },
    ],
  }),

  computed: {
    ...mapState(["opiniones"]),
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    eliminar(fila) {
      console.log(fila);
      let identificacion = this.opiniones.indexOf(fila);
      console.log(identificacion);
      let titulo = fila.juego;
      console.log(fila.juego);
      let respuesta = confirm(
        `Esta seguro que quiere eliminar opinion con id: ${identificacion} y nombre de juego: ${titulo}`
      );
      if (respuesta == true) {
        alert("Eligio eliminar el elemento : " + identificacion);
        this.$store.dispatch("eliminarOpinion", identificacion);
      } else {
        alert("Canceló la eliminación");
      }
    },
    showModal(fila) {
      this.indexEditadoLocal = null;
      this.formLocal.juego = fila.juego;
      this.formLocal.nombre = fila.nombre;
      this.formLocal.opinion = fila.opinion;
      this.organizarMensaje(this.formLocal.juego);
      this.indexEditadoLocal = this.opiniones.indexOf(fila);
      console.log(this.indexEditadoLocal);
      this.dialog = true;
    },
    organizarMensaje(unNombreJuego) {
      this.mensajeModal = "Edita tu opinión para el juego: ";
      this.mensajeModal += unNombreJuego;
    },
    onSubmit(event) {
      event.preventDefault();

      let miOpinion = this.formLocal;
      console.log(miOpinion);

      let elNombreJuego = this.formLocal.juego;
      console.log(elNombreJuego);
      let elNombreAutor = this.formLocal.nombre;
      console.log(elNombreAutor);
      let laOpinion = this.formLocal.opinion;
      console.log("Data a editar: ");
      console.log(laOpinion);

      let cargaOpinion = {
        juego: elNombreJuego,
        nombre: elNombreAutor,
        opinion: laOpinion,
      };

      this.$store.commit("SETINDEXEDITADO", this.indexEditadoLocal);
      this.$store.dispatch("editarOpinion", cargaOpinion);
      this.formLocal.juego = "";
      this.formLocal.nombre = "";
      this.formLocal.opinion = "";
      this.indexEditadoLocal = null;
      this.dialog = false;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>