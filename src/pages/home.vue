<template>

  <q-page
    style="
      background-image: url('../statics/bg.jpg');
      background-size: cover; height: 100%">
    <div class="fixed-center page-content">

      <q-item-label class="text-white q-mx-md text-bold">From</q-item-label>
      <q-select
        filled
        class="bg-white q-ma-md input-date"
        v-model="model"
        use-input
        input-debounce="0"
        label="From"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-item-label class="text-white q-mx-md text-bold">To</q-item-label>
      <q-select
        filled
        class="bg-white q-ma-md input-date"
        v-model="model"
        use-input
        input-debounce="0"
        label="To"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-item-label class="text-white q-mx-md text-bold">Departure</q-item-label>
      <q-input filled v-model="date" style="width: 250px" mask="date"
               class="bg-white q-ma-md input-date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date" @input="() => $refs.qDateProxy.hide()"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-btn icon="search" to="pick-seat" color="blue-9" class="btn-search q-mt-md" text-color="white" label="Search" />

    </div>
  </q-page>
</template>

<script>
  import {exportFile} from "quasar";
  import {mapState, mapActions} from 'vuex'
  import '../utils/filter'
  import {Constants} from 'src/utils/const'

  const stringOptions = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
  ]

  export default {
    data() {
      return {
        model: null,
        options: stringOptions,
        date: '2019/02/01'
      }
    },

    methods: {
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
    }
  }
</script>
<style>
  .page-content {
    padding-right: 55%;
  }

  .input-date {
    border-radius: 5px;
  }

  .btn-search{
    margin-left: 75px;
  }
</style>
