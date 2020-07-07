import Vue from 'vue'
import Vuex from 'vuex'

import station from './station'
import train from './train'
import object from './object'
import order from './order'
import ticket from './ticket'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    station,
    train,
    object,
    order,
    ticket
  }
});

export default function (/* { ssrContext } */) {
  return store
}
