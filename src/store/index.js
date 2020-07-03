import Vue from 'vue'
import Vuex from 'vuex'

import station from './station'
import train from './train'
import object from './object'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    station,
    train,
    object
  }
});

export default function (/* { ssrContext } */) {
  return store
}
