<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Tickets"
      :data="orderDetail"
      :columns="cols"
      row-key="Name"
      hide-pagination
    >
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ index(props.row.Id) }}
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          {{ props.row.Price | formatInteger }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  import '../utils/filter'
  import {Constants} from '../utils/const'
  import {httpClient} from "src/api/http";
  import axios from 'axios'

  export default {
    data() {
      return {
        cols: [
          {
            name: "index",
            align: "left",
            label: "Index",
            field: "index"
          },
          {
            name: "code",
            align: "left",
            label: "Ticket Code",
            field: "Code"
          },
          {
            name: "passenger_name",
            align: "left",
            label: "Passenger Name",
            field: "PassengerName"
          },
          {
            name: "identity Number",
            align: "left",
            label: "Identity Number",
            field: "IdentityNumber"
          },
          {
            name: "train",
            align: "left",
            label: "Train",
            field: "Train"
          },
          {
            name: "train_car",
            align: "left",
            label: "Train Car",
            field: "TrainCar"
          },
          {
            name: "seat",
            align: "left",
            label: "Seat Number",
            field: "Seat"
          },
          {
            name: "object_passenger",
            align: "left",
            label: "Object Passenger",
            field: "ObjectPassenger"
          },
          {
            name: "departure_day",
            align: "left",
            label: "Departure Day",
            field: "DepartureDay"
          },
          {
            name: "price",
            align: "left",
            label: "Price",
            field: "Price"
          }
        ]
      };
    },
    props: ['orderId'],
    computed: {
      ...mapState('order', ['orderDetail']),
    },
    created () {
      this.loadOrderDetail({
        orderId : this.orderId
      }) //prints out an empty string
    },
    methods: {
      ...mapActions({
        loadOrderDetail: 'order/loadOrderDetail'
      }),
      index: function (id) {
        return this.orderDetail.findIndex(x => x.Id === id) + 1;
      }
    }
  };
</script>
<style>
</style>
