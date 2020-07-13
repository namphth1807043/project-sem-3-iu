<template>
  <q-page class="flex-center">
    <div class="row">
      <div class="col-9">
        <q-chip square style="background-color: #0382c1" text-color="white" class="q-mt-md q-ml-md">
          <span class="text-bold">Departing direction&nbsp;</span>date {{ departureDay }} from {{ startStationName }} to
          {{ endStationName }}
        </q-chip>
        <div class="row">
          <div v-for="(item,index) of routes"
               :key="item.TrainId"
               class="q-ma-lg train"
               style="width: 200px; height: 250px">
            <div @click="trainSelected = item.TrainId"
                 :class="[{ trainNoClick: item.TrainId !== trainSelected, trainOnClick: item.TrainId === trainSelected }]">
              <q-chip dense
                      square
                      text-color="white"
                      class="train-code text-bold"
                      style="background-color: #0382c1">
                {{ item.TrainCode }}
              </q-chip>
              <div class="train-info">
                <div class="">
                  Departure <span class="text-bold">{{ departureDay.slice(0,-5) }} {{ item.Points[0].ArrivalTime | time }}</span>
                </div>
                <div class="">
                  Arrival &nbsp;<span class="float-right text-bold">{{ departureDay.slice(0,-5) }} {{ item.TravelTime | time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="row q-pl-lg">
            <div v-for="(item,index) in myTrainCars">
              <div class="train-car bg-blue-3 q-mr-sm"
                   @click="tranCarSelected = item.Id"
                   :class="[
               {
                 'bg-blue-4': item.Id !== tranCarSelected,
                 'bg-green-5': item.Id === tranCarSelected
               }
              ]">
                <img src="../statics/trainCar.png" alt="">
                <div class="text-center">{{ item.IndexNumber}}</div>
              </div>
            </div>
            <div class="q-mr-sm">
              <img src="../statics/train-head.png" alt="">
              <div class="text-center">{{ trainCode }}</div>
            </div>
            <div class="flex-break q-py-md"></div>
          </div>
          <div class="text-bold q-pt-lg q-pl-xl" style="color: #0382c1">
            Coach number {{ trainCarNumber }}: {{ trainCarType }}
          </div>
          <div class="row seat-train-car q-pl-lg q-py-md q-ml-md q-my-lg"
               style="width: 1255px" v-if="$q.screen.gt.lg">
            <div class="seat text-center"
                 v-for="(item,index) in seats"
                 @click="pickSeats(item)"
                 style="width: 65px;"
                 :class="[{
                 'bg-green-5 text-white': cart.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.idTrain === idTrain),
                  'bg-yellow-9 text-white': chosenSeats.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.departureDay === departureDay.split('/').join('-')) &&
                  cart.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.idTrain === idTrain) === false,
                  'bg-red-7 text-white': item.EmptySeat === false
               }]">
              {{ item.SeatNo }}
              <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-indigo"
                         content-style="font-size: 20px" :offset="[10, 10]">
                Price: {{ item.Price}} $
              </q-tooltip>
            </div>
          </div>
          <div class="row seat-train-car q-pl-lg q-py-md q-ml-md q-my-lg" style="width: 950px" v-else>
            <div class="seat text-center"
                 style="width: 47px;"
                 v-for="(item,index) in seats"
                 @click="pickSeats(item)"
                 :class="[{
                 'bg-green-5 text-white': cart.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.idTrain === idTrain),
                  'bg-yellow-9 text-white': chosenSeats.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.departureDay === departureDay.split('/').join('-')) &&
                  cart.some(i =>
                  i.idTrainCar === idTrainCar &&
                  i.idSeat === item.Id &&
                  i.idTrain === idTrain) === false,
                  'bg-red-7 text-white': item.EmptySeat === false
               }]">
              {{ item.SeatNo }}
              <q-tooltip anchor="top middle" self="bottom middle" content-class="bg-indigo"
                         content-style="font-size: 20px" :offset="[10, 10]">
                Price: {{ item.Price}} $
              </q-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 cart">
        <cart :countDowns="countDowns"></cart>
      </div>
    </div>
    <div class="row q-pb-xl">
      <div class="q-pl-md q-pr-xl q-pt-lg col-9">
        <q-card bordered class="my-card">
          <q-item>
            <q-item-section side>
              <q-icon name="error" size="sm" color="blue-9"/>
            </q-item-section>

            <q-item-section class="text-bold text-blue-9">
              Nếu đặt nhiều hơn 4 chỗ quý khách vui lòng liên 0793245698
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-card-section>
            <q-list>
              <q-item v-ripple>
                <q-item-section class="text-blue-8 text-center text-bold">Train Statuses</q-item-section>
              </q-item>

              <q-item class="q-mb-xl">
                <q-item-section>
                  <div class="row">
                    <div>
                      <div class="train-car-status bg-blue-3 q-mr-md">
                        <img src="../statics/trainCar.png" alt="">
                      </div>
                    </div>
                    <div class="text-h5 q-pt-xs q-mr-xl">Available</div>
                    <div>
                      <div class="train-car-status bg-green-5 q-mr-md">
                        <img src="../statics/trainCar.png" alt="">
                      </div>
                    </div>
                    <div class="text-h5 q-pt-xs q-mr-xl">Being selected</div>
                    <div>
                      <div class="train-car-status bg-red-7 q-mr-md">
                        <img src="../statics/trainCar.png" alt="">
                      </div>
                    </div>
                    <div class="text-h5 q-pt-xs">Sold out</div>
                  </div>
                </q-item-section>
              </q-item>

              <q-separator inset=""/>

              <q-item v-ripple>
                <q-item-section class="text-blue-8 text-center text-bold">Seat Statuses</q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <div class="row">
                    <div class="col-6">
                      <div class="q-mr-md seat-status-1 float-left bg-red-7"></div>
                      <div class="text-h5 seat-status-3 q-pt-xs">Not available</div>
                    </div>
                    <div class="col-6">
                      <div class="bg-yellow-9 q-mr-md seat-status-1 float-left"></div>
                      <div class="text-h5 q-pt-xs">Being transacted</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <div class="q-mr-md seat-status-1 float-left"></div>
                      <div class="text-h5 seat-status-3 q-pt-xs">Available</div>
                    </div>
                    <div class="col-6">
                      <div class="bg-green-5 q-mr-md seat-status-1 float-left"></div>
                      <div class="text-h5 q-pt-xs">Being selected</div>
                    </div>
                  </div>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
  import '../utils/filter'
  import {mapActions, mapState} from "vuex";
  import Cart from '../pages/cart'
  import firebase from 'src/api/firebase';
  import moment from 'moment'
  const db = firebase.firestore()
  export default {
    components: {
      Cart
    },
    data() {
      return {
        model: null,
        trainSelected: undefined,
        tranCarSelected: undefined,
        trainClicked: false,
        arrivalTime: [],
        myTrainCars: [],
        trainCode: '',
        trainCarNumber: null,
        trainCarType: '',
        startIndex: 0,
        endIndex: 0,
        chosenSeats: [],
        countDowns: []
      }
    },
    created() {
      if (this.idTrain && this.idTrainCar){
        this.myTrainCars = this.trainCars.reverse()
        this.trainSelected = this.idTrain
        this.tranCarSelected = this.idTrainCar
      }
      else {
        this.$router.push('/')
      }
      db.collection('chosen-seats').onSnapshot(ref => {
        ref.docChanges().forEach(change => {
          const {newIndex, oldIndex, doc, type} = change
          if (type === 'added') {
            this.chosenSeats.splice(newIndex, 0, doc.data())
          } else if (type === 'modified') {
            this.chosenSeats.splice(oldIndex, 1)
            this.chosenSeats.splice(newIndex, 0, doc.data())
          } else if (type === 'removed') {
            this.chosenSeats.splice(oldIndex, 1)
          }
        })
      })
    },
    mounted() {
    },
    watch: {
      async trainSelected(val) {
        if (val){
          await this.loadTrainCars({
            params: {
              IdTrain: val
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
          this.myTrainCars = this.trainCars.reverse()
          this.tranCarSelected = this.idTrainCar
          for (let item of this.routes) {
            if (item.TrainId === this.idTrain) {
              this.trainCode = item.TrainCode
              this.startIndex = item.StartIndex
              this.endIndex = item.EndIndex
            }
          }
        }else {
          await this.$router.push('')
        }
      },
      async tranCarSelected(val) {
        await this.loadSeats({
          params: {
            departureDay: this.departureDay.split("/").join("-"),
            startStation: this.startStation,
            endStation: this.endStation,
            IdTrainCar: val
          }
        })
        this.tranCarSelected = this.idTrainCar
        for (let item of this.trainCars) {
          if (item.Id === this.idTrainCar) {
            this.trainCarNumber = item.IndexNumber + 1
            this.trainCarType = item.TrainCarType
          }
        }
      }
    },
    computed: {
      ...mapState('ticket', [
        'stations',
        'startStation',
        'endStation',
        'departureDay',
        'routes',
        'isLoadingSeat',
        'isLoadingTrainCar',
        'seats',
        'idTrainCar',
        'trainCars',
        'idTrain',
        'cart'
      ]),
      startStationName() {
        let points = this.routes
        return points[0].Points[0].NameStation
      },
      endStationName() {
        let route = this.routes
        let point = route[0].Points
        return point[point.length - 1].NameStation
      }
    },
    methods: {
      ...mapActions({
        loadTrainCars: 'ticket/loadTrainCars',
        loadSeats: 'ticket/loadSeats',
        // addCartItem: 'ticket/addCartItem',
        // removeCartItem: 'ticket/removeCartItem',
        updateCartItem: 'ticket/updateCartItem'
      }),

      pickSeats(seat) {
        let departureDay = this.departureDay.split("/").join("-")
        let rs = this.chosenSeats.some(i =>
          i.idTrainCar === this.idTrainCar &&
          i.idSeat === seat.Id &&
          i.departureDay === departureDay &&
          this.cart.some(i =>
            i.idTrainCar === this.idTrainCar &&
            i.idSeat === seat.Id &&
            i.idTrain === this.idTrain) === false)
        if (seat.EmptySeat === false) {
          this.$q.notify({
            message: 'Seat already reserved',
            color: 'red'
          })
        } else if (rs === true) {
          this.$q.notify({
            message: 'Seat are being transacted',
            color: 'yellow-9'
          })
        } else {
          let route = this.routes
          let point = route[0].Points
          let departureTime = 0;
          let startIndex = 0;
          let endIndex = 0;
          for (let item of this.routes) {
            if (item.TrainId === this.idTrain) {
              departureTime = item.Points[0].ArrivalTime
              startIndex = this.routes.StartIndex
              endIndex = this.routes.EndIndex
            }
          }
          let cartItem = {
            idSeat: seat.Id,
            price: seat.Price,
            seatNo: seat.SeatNo,
            idTrainCar: this.idTrainCar,
            idTrain: this.idTrain,
            trainCarNumber: this.trainCarNumber,
            trainCarType: this.trainCarType,
            trainCode: this.trainCode,
            departureDay: this.departureDay.split("/").join("-"),
            departureTime: departureTime,
            idSource: point[0].IdStation,
            idDestination: point[point.length - 1].IdStation,
            sourceName: point[0].NameStation,
            destinationName: point[point.length - 1].NameStation,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }
          this.updateCartItem(cartItem)
          let rs = this.countDowns.some(
            item =>
              item.idTrainCar === cartItem.idTrainCar &&
              item.idSeat === cartItem.idSeat &&
              item.departureDay === cartItem.departureDay
          )
          if (rs) {
            this.countDowns.splice(
              this.countDowns.findIndex(
                x =>
                  x.idTrainCar === cartItem.idTrainCar &&
                  x.idSeat === cartItem.idSeat &&
                  x.departureDay === cartItem.departureDay
              ), 1)
          } else {
            let countDown = {
              idSeat: seat.Id,
              idTrainCar: this.idTrainCar,
              departureDay: this.departureDay.split("/").join("-"),
              countDown: 10
            }
            this.countDowns.push(countDown)
            this.countDownTimer(cartItem)
          }
        }
      },
      countDownTimer(cartItem) {
        for(let i of this.countDowns){
          if (i.idTrainCar === cartItem.idTrainCar && i.idSeat === cartItem.idSeat && i.departureDay === cartItem.departureDay){
              if (i.countDown > 0){
                setTimeout(() => {
                  i.countDown -= 1
                  this.countDownTimer(cartItem)
                }, 1000)
              }
              else {
                this.countDowns.splice(
                  this.countDowns.findIndex(
                    x =>
                      x.idTrainCar === cartItem.idTrainCar &&
                      x.idSeat === cartItem.idSeat &&
                      x.departureDay === cartItem.departureDay
                  ), 1)
                this.updateCartItem(cartItem)
              }
          }
        }
      }
    }
  }
</script>
<style type="text/scss">
  .trainOnClick {
    height: 100%;
    width: 100%;
    position: relative;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../statics/train.png');
    cursor: pointer;

  }

  .trainNoClick {
    height: 100%;
    width: 100%;
    position: relative;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../statics/train.png');
    filter: grayscale(100%);
    cursor: pointer;
  }

  .train-code {
    position: absolute;
    top: 2%;
    left: 37%;
  }

  .train-info {
    position: absolute;
    top: 17%;
    left: 15%;
  }

  .train-car {
    border-radius: 10%;
    height: 52%;
    cursor: pointer;
  }

  .train-car-status {
    border-radius: 10%;
    height: 68%;
  }

  .seat {
    border: solid 2px black;
    cursor: pointer;
    margin: 5px;
    border-radius: 5px;
  }

  .cart-item {
    border: solid 1px grey;
  }

  .seat-train-car {
    border: solid 3px #0382c1;
    border-radius: 10px;
  }

  .cart {
    position: fixed;
    right: 2%;
    top: 10%;
  }

  .seat-status-1 {
    border: solid 1px black;
    width: 70px;
    height: 40px;
    border-radius: 10px;
  }

  .seat-status-2 {
    margin-right: 24%;
  }

  .seat-status-3 {
  }
</style>
