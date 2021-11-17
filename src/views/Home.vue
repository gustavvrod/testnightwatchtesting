<template>
  <div id="home">
    <v-row justify="center">
      <v-col cols="10">
        <h1>Lista de juegos</h1>
      </v-col>
    </v-row>
    <div lg="2" xl="2" md="2" cols="12">
      <Card />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  name: "Home",
  components: {
    Card,
  },

  mounted() {
    this.cargaTabla();
  },
  methods: {
    cargaTabla() {
      console.log("se llama metodo cargarTabla");
      this.$store.dispatch("cargarJuegos");
    },
  },
};
</script>
