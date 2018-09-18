import Vue from "vue";
import VApp from "vuetify/es5/components/VApp";
import Vuetify from "vuetify/es5/components/Vuetify";
import transitions from "vuetify/es5/components/transitions";
import directives from "vuetify/es5/directives";

Vue.use(Vuetify, {
  components: {
    VApp,
    transitions
  },
  directives
});
