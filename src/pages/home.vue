<template>

  <q-page
    style="
      background-image: url('../statics/bg.jpg');
      background-size: cover; height: 100%">
    <div class="fixed-center page-content">

      <q-item-label class="text-white q-mx-md text-bold">From</q-item-label>
      <q-select
        filled
        v-model="from"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        label="From"
        :options="options"
        @filter="filterFn"
        class="bg-white q-ma-md input-date"
        style="width: 250px"
        option-value="Id"
        option-label="Name"
        option-disable="inactive"
        emit-value
        map-options
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
        v-model="to"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        label="To"
        :options="options"
        @filter="filterFn"
        class="bg-white q-ma-md input-date"
        style="width: 250px"
        option-value="Id"
        option-label="Name"
        option-disable="inactive"
        emit-value
        map-options
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
      <q-input filled v-model="date" style="width: 250px"
               class="bg-white q-ma-md input-date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="DD/MM/YYYY" :options="optionDate" @input="() => $refs.qDateProxy.hide()"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-btn icon="search" @click="findTicket" color="blue-9" class="btn-search q-mt-md" text-color="white"
             label="Search"/>

    </div>
  </q-page>
</template>

<script>
  import '../utils/filter'
  import {Constants} from 'src/utils/const'
  import moment from 'moment'
  import {httpClient} from "src/api/http";
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        from: null,
        to: null,
        options: [],
        date: ''
      }
    },
    created() {
      this.loadStations();
    },
    mounted() {
      function getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i=0;i<vars.length;i++) {
          let pair = vars[i].split("=");
          if (pair[0] === variable) {
            return pair[1];
          }
        }
      }
      let payment = getQueryVariable("payment");
      if (payment){
          this.$q.notify({
            message: 'Payment success. Hope you enjoy the trip <3',
            color: 'green'
          })
      }
    },
    computed: {
      ...mapState('ticket', ['stations', 'startStation', 'endStation', 'departureDay', 'routes', 'seats','trainCars'])
    },
    methods: {
      ...mapActions({
        loadStations: 'ticket/loadAllStations',
        loadRoutes: 'ticket/loadRoutes',
        loadSeats: 'ticket/loadSeats',
        loadTrainCars: 'ticket/loadTrainCars'
      }),
      filterFn(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow
        setTimeout(() => {
          update(() => {
            if (val === '') {
              this.options = this.stations
            } else {
              const needle = val.toLowerCase()
              this.options = this.stations.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
            }
          })
        }, 500)
      },

      optionDate(date) {
        return date > moment().format("YYYY/MM/DD")
      },

     async findTicket(){
       await this.loadRoutes({
          departureDay: this.date,
          params: {
            startStation: this.from,
            endStation: this.to
          }
        });
       await this.loadTrainCars({
         params: {
           IdTrain: this.routes[0].TrainId
         }
       })
       await this.loadSeats({
         params: {
           departureDay: this.departureDay,
           startStation: this.startStation,
           endStation: this.endStation,
           IdTrainCar: this.trainCars[0].Id
         }
       })
       await this.$router.push('pick-seat')
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

  .btn-search {
    margin-left: 75px;
  }

  .q-virtual-scroll__content {
    max-height: 300px;
  }
</style>
