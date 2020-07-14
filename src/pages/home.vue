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
        :options="suggestOptions"
        @filter="filterFn"
        class="bg-white q-ma-md input-date"
        style="width: 250px"
        option-value="Id"
        option-label="Name"
        option-disable="inactive"
        emit-value
        map-options
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="scope.opt.Name"/>
            </q-item-section>
            <q-item-section avatar v-if="scope.opt.index === 0" style="color: grey">
              <q-item-label class="float-left"> {{closet}} km<q-icon @click="map(scope.opt.Latitude,scope.opt.Longitude)" name="my_location" size="sm" class="q-ml-sm"/></q-item-label>
            </q-item-section>
          </q-item>
          <q-separator v-if="scope.opt.index === 0"/>
          <q-separator v-if="scope.opt.index === 0"/>
        </template>
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
        suggestOptions: [],
        date: '',
        location: null,
        gettingLocation: false,
        errorStr: null,
        closet: null
      }
    },
    created() {
      this.loadStations();
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      })
    },
    mounted() {
      function getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
          let pair = vars[i].split("=");
          if (pair[0] === variable) {
            return pair[1];
          }
        }
      }

      let payment = getQueryVariable("payment");
      if (payment) {
        this.$q.notify({
          message: 'Payment success. Hope you enjoy the trip <3',
          color: 'green'
        })
      }
    },
    computed: {
      ...mapState('ticket', ['stations', 'startStation', 'endStation', 'departureDay', 'routes', 'seats', 'trainCars'])
    },
    methods: {
      ...mapActions({
        loadStations: 'ticket/loadAllStations',
        loadRoutes: 'ticket/loadRoutes',
        loadSeats: 'ticket/loadSeats',
        loadTrainCars: 'ticket/loadTrainCars'
      }),
      distance(lat1, lon1, lat2, lon2) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
          return 0;
        } else {
          let radlat1 = Math.PI * lat1 / 180;
          let radlat2 = Math.PI * lat2 / 180;
          let theta = lon1 - lon2;
          let radtheta = Math.PI * theta / 180;
          let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180 / Math.PI;
          dist = dist * 60 * 1.1515;
          dist = dist * 1.609344
          return dist;
        }
      },
      filterFn(val, update, abort) {
        setTimeout(() => {
          update(() => {
            if (val === '') {
              this.suggestOptions = [...this.stations]
              let closest = Math.round(this.distance(this.location.coords.latitude, this.location.coords.longitude, this.suggestOptions[0].Latitude, this.suggestOptions[0].Longitude))
              let closestId = this.suggestOptions[0].Id
              this.suggestOptions.forEach((row, index) => {
                row.index = index
                let distance = Math.round(this.distance(this.location.coords.latitude, this.location.coords.longitude, row.Latitude, row.Longitude))
                if (distance <= closest) {
                  closest = distance
                  closestId = row.Id
                }
              })
              this.suggestOptions.sort(function (x, y) {
                return x.Id === closestId ? -1 : y.Id === closestId ? 1 : 0;
              });
              this.closet = closest
              this.options = this.stations
            } else {
              const needle = val.toLowerCase()
              this.options = this.stations.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
              this.suggestOptions = this.stations.filter(v => v.Name.toLowerCase().indexOf(needle) > -1)
            }
          })
        }, 500)
      },

      optionDate(date) {
        return date > moment().format("YYYY/MM/DD")
      },

      async findTicket() {
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
            departureDay: this.departureDay.split("/").join("-"),
            startStation: this.startStation,
            endStation: this.endStation,
            IdTrainCar: this.trainCars[0].Id
          }
        })
        await this.$router.push('pick-seat')
      },
      map(lat, long){
        window.open(`https://www.google.com/search?q=${lat}+${long}`, '_blank');
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
