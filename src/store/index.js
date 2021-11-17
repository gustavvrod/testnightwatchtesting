import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        juegos: [],
        opiniones: [],
        loading: false,
        opinion: {
            juego: '',
            nombre: '',
            opinion: '',
        },
        indexEditado: undefined,
    },
    mutations: {
        LOADINGTABLE(state) {
            state.loading = true;
        },
        GETJUEGOS(state, juegos) {
            state.juegos = juegos;
            state.loading = false;
        },
        AGREGAROPINION(state, laOpinion) {
            state.opiniones.push(laOpinion);
        },
        AGREGARFORMNOMBRE(state, unNombre) {
            state.opinion.nombre = unNombre;
        },
        ELIMINAROPINION(state, id) {
            state.opiniones.splice(id, 1);
            alert('Elemento eliminado exitosamente');
        },
        EDITAROPINION(state, cargaUtil) {
            console.log('carga:', cargaUtil);
            state.opiniones.splice(state.indexEditado, 1, cargaUtil);
            alert('Elemento editado exitosamente');
        },
        SETINDEXEDITADO(state, indice) {
            state.indexEditado = indice;
        }
    },
    actions: {
        cargarJuegos(context) {
            console.log('se llama action actiongetjuegos');
            context.commit('LOADINGTABLE')
            axios.get(`https://api.rawg.io/api/games?key=667bc07c9cfd42cb819a2413f7a7eabd`)
                .then((accept) => {
                    let data = accept.data.results;
                    console.log(accept);
                    context.commit('GETJUEGOS', data);
                });
        },
        agregarOpinion(context, unaOpinion) {
            context.commit('AGREGAROPINION', unaOpinion);
        },
        eliminarOpinion(context, id) {
            context.commit('ELIMINAROPINION', id);
        },
        editarOpinion(context, cargaUtil) {
            console.log('editarOpinion')
            console.log('carga util: ', cargaUtil);
            context.commit('EDITAROPINION', cargaUtil);
        }
    },
    modules: {},
});