<template>
  <div class="Opiniones">
    <v-row justify="center">
      <v-col cols="10">
        <h1>{{ tituloOpiniones }}</h1>
      </v-col>
    </v-row>
    <Componenteopinion />
  </div>
</template>

<script>
import Componenteopinion from "@/components/Componenteopinion.vue";
export default {
  name: "Opiniones",
  data() {
    return {
      tituloOpiniones: "Lista de Opiniones",
    };
  },
  components: {
    Componenteopinion,
  },
};
</script>
