<template>
  <div id="administracion">
    <v-row justify="center">
      <v-col cols="10">
        <h1>Administración de las opiniones</h1>
      </v-col>
    </v-row>
    <Componenteadministracion />
  </div>
</template>

<script>
import Componenteadministracion from "../components/Componenteadministracion.vue";
export default {
  components: { Componenteadministracion },
};
</script>
