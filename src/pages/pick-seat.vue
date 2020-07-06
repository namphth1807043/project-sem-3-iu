<template>
  <q-page class="flex-center">
    <div class="row">
      <div class="col-9">
        <q-chip square style="background-color: #0382c1" text-color="white" class="q-mt-md q-ml-md">
          <span class="text-bold">Departing direction&nbsp;</span>date 11/07/2020 from Hải Phòng to Hà Nội
        </q-chip>
        <div class="row">
          <div v-for="(item,index) of 4" class="q-ma-lg train" style="width: 200px; height: 250px">
            <div @click="trainSelected = index"
                 :class="[{ trainNoClick: index !== trainSelected, trainOnClick: index === trainSelected }]">
              <q-chip dense
                      square
                      text-color="white"
                      class="train-code text-bold"
                      style="background-color: #0382c1">
                LP2
              </q-chip>
              <div class="train-info">
                <div class="">
                  Departure <span class="text-bold">11/07 06:10</span>
                </div>
                <div class="">
                  Arrival <span class="float-right text-bold">11/07 06:10</span>
                </div>
                <div class="">
                  Ordered <span class="float-right">Available</span>
                </div>
                <div class="text-bold">
                  0 <span class="float-right">352</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-pl-lg">
          <div v-for="(item,index) in 7">
            <div class="train-car bg-blue-3 q-mr-sm"
                 @click="tranCarSelected = index"
                 :class="[
               {
                 'bg-blue-4': index !== tranCarSelected,
                 'bg-green-5': index === tranCarSelected
               }
              ]">
              <img src="../statics/trainCar.png" alt="">
              <div class="text-center">{{ index }}</div>
            </div>
          </div>
          <div class="q-mr-sm">
            <img src="../statics/train-head.png" alt="">
            <div class="text-center">LP2</div>
          </div>
          <div class="flex-break q-py-md"></div>
        </div>
        <div class="text-bold q-pt-lg" style="padding-left: 25%; color: #0382c1">Coach number 1: Soft seat,
          air-conditioned
        </div>
        <div class="row seat-train-car q-pl-lg q-py-md q-ml-md q-my-lg" style="width: 88%">
          <div style="width: 5%"
               class="seat text-center"
               v-for="(item,index) in 64"
               @click="seatSelected = index"
               :class="{ 'bg-green-5 text-white': index === seatSelected }">
            {{ index + 1}}
          </div>
        </div>
      </div>
      <div class="col-3 cart">
        <q-card bordered class="my-card">
          <q-item>
            <q-item-section side>
              <q-icon name="shopping_cart" size="md" color="blue-9"/>
            </q-item-section>

            <q-item-section class="text-bold text-blue-9">
              Your cart
            </q-item-section>

            <q-item-section side class="text-bold text-blue-9">
              <q-btn to="payment" label="Buy ticket" color="blue-8"/>
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-card-section>
            <q-list>

              <q-item>
                <q-item-section>
                  <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                  <q-item-label>11/07/2020 06:10</q-item-label>
                  <q-item-label>NML coach 1 seat 56</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
                </q-item-section>
              </q-item>

              <q-separator inset=""/>

              <q-item>
                <q-item-section>
                  <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                  <q-item-label>11/07/2020 06:10</q-item-label>
                  <q-item-label>NML coach 1 seat 56</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
                </q-item-section>
              </q-item>

              <q-separator inset=""/>

              <q-item>
                <q-item-section>
                  <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                  <q-item-label>11/07/2020 06:10</q-item-label>
                  <q-item-label>NML coach 1 seat 56</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
                </q-item-section>
              </q-item>

              <q-separator inset=""/>

              <q-item>
                <q-item-section>
                  <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                  <q-item-label>11/07/2020 06:10</q-item-label>
                  <q-item-label>NML coach 1 seat 56</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
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
                    <div class="q-mr-md seat-status-1 bg-red-7"></div>
                    <div class="text-h5 seat-status-2 q-pt-xs">Not available</div>
                    <div class="bg-yellow-9 q-mr-md seat-status-1"></div>
                    <div class="text-h5 q-pt-xs">Being transacted</div>
                  </div>
                  <div class="row">
                    <div class="q-mr-md seat-status-1"></div>
                    <div class="text-h5 seat-status-3 q-pt-xs">Available</div>
                    <div class="bg-green-5 q-mr-md seat-status-1"></div>
                    <div class="text-h5 q-pt-xs">Being selected</div>
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


  const stringOptions = [
    'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
  ]

  export default {
    data() {
      return {
        model: null,
        trainSelected: undefined,
        tranCarSelected: undefined,
        seatSelected: undefined,
        options: stringOptions,
        date: '2019/02/01',
        trainClicked: false
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
    top: 11%;
    left: 15%;
  }

  .train-car {
    border-radius: 10%;
    height: 52%;
    cursor: pointer;
  }

  .train-car-status{
    border-radius: 10%;
    height: 68%;
  }

  .seat {
    border: solid 2px black;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
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
    top: 11%;
  }

  .seat-status-1 {
    border: solid 1px black;
    width: 70px;
    height: 40px;
    border-radius: 10px;
  }

  .seat-status-2 {
    margin-right:24%;
  }

  .seat-status-3 {
    margin-right:28.5%;
  }
</style>
