<template>
  <q-card bordered class="my-card">
    <q-item>
      <q-item-section side>
        <q-icon name="shopping_cart" size="md" color="blue-9"/>
      </q-item-section>

      <q-item-section class="text-bold text-blue-9">
        Your cart
      </q-item-section>

      <q-item-section side class="text-bold text-blue-9" v-if="cart.length > 0">
        <q-btn to="payment" label="Buy ticket" color="blue-8"/>
      </q-item-section>
    </q-item>

    <q-separator/>

    <q-card-section>
      <q-list v-if="cart.length > 0">
        <div v-for="(item,index) in cart" :key="item.idSeat" >
          <q-item>
            <q-item-section>
              <q-item-label>{{ item.trainCode }} {{ item.sourceName + " - " + item.destinationName }}</q-item-label>
              <q-item-label>{{item.departureDay}} {{item.departureTime | time}}</q-item-label>
              <q-item-label>{{item.trainCarType}} coach {{item.trainCarNumber}} seat {{item.seatNo}}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="q-pr-md text-red-9">{{ item.countDown }}</div>
              <q-btn dense
                     flat
                     unelevated
                     icon="delete_outline"
                     color="blue-10"
                     size="lg"
                     @click="delCartItem(item)"/>
            </q-item-section>
          </q-item>

          <q-separator inset="" v-if="index < cart.length - 1"/>
        </div>
      </q-list>
      <q-list v-else>
        <div class="text-red-5 text-center text-h5">
          Your cart is empty
        </div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
  import '../utils/filter'
  import {mapActions, mapState} from "vuex";

  export default {
    // props: ['countDowns'],
    data() {
      return {}
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState('ticket', [
        'cart'
      ])
    },
    methods: {
      ...mapActions({
        updateCartItem: 'ticket/updateCartItem'
      }),
      delCartItem(cartItem) {
        this.updateCartItem(cartItem)
      },
      // countDown(item) {
      //   let rs = this.countDowns.find(i =>
      //     i.idTrainCar === item.idTrainCar &&
      //     i.idSeat === item.idSeat &&
      //     i.departureDay === item.departureDay
      //   )
      //   if (rs){
      //     return rs.countDown
      //   }
      // },
      // countDownTimer() {
      //   for (let item of this.countDowns) {
      //     if (item.countDown > 0) {
      //       setTimeout(() => {
      //         item.countDown -= 1
      //         this.countDownTimer()
      //       }, 1000)
      //     }
      //   }
      // },
      // payment(){
      //   for(let item of this.cart){
      //     let rs = this.countDowns.find(i =>
      //       i.idTrainCar === item.idTrainCar &&
      //       i.idSeat === item.idSeat &&
      //       i.departureDay === item.departureDay
      //     )
      //     if (rs){
      //       let newItem = {
      //         ...item,
      //         countDown: rs.countDown
      //       }
      //       this.updateCartItem(newItem)
      //     }
      //   }
      // }
    }
  }
</script>
<style type="text/scss">
  .cart-item {
    border: solid 1px grey;
  }

  .cart {
    position: fixed;
    right: 2%;
    top: 10%;
  }
</style>
