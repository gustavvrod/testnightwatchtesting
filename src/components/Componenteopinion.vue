<template>
  <div>
    <v-alert
      v-model="alert"
      border="bottom"
      color="red lighten-1"
      dark
      v-if="mostrar"
    >
      No existen opiniones almacenadas para mostrar en este momento.
    </v-alert>
    <v-row justify="center">
      <v-col cols="11">
        <v-expansion-panels
          v-model="panel"
          multiple
          v-for="(opinion, index) in opiniones"
          :key="index"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Opinion realizada por: {{ opinion.nombre }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ opinion.opinion }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Componenteopinion",
  data() {
    return {
      sinOpiniones: "No existen opiniones para mostrar",
      panel: [0, 1],
      alert: false,
    };
  },
  computed: {
    ...mapState(["opiniones", "loading"]),
  },
  methods: {
    mostrar() {
      if (this.opiniones.length > -1) {
        console.log(this.opiniones.length);
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
  },
};
</script>

