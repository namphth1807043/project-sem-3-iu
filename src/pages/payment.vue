<template>
  <q-page class="justify-center" style="padding: 0 10%">
    <q-chip square
            style="background-color: #0382c1"
            text-color="white"
            class="q-mt-md q-ml-xl">
      INFORMATION OF TICKET CART
    </q-chip>
    <div class="q-pa-md q-gutter-sm">
      <q-banner class="bg-blue-3" rounded>
        The tickets that have icon
        <q-icon name="report_problem" color="red" size="sm"/>
        are out of holding time.<br/>
        Please remove them from the ordered ticket list before making payment.<br/>
        Please fill fully, exactly all the information about the passenger(s)including: full name, personal papers
        (identification number or passport number or driving license or date of birth (for children) or student identity
        card (for student)).<br/>
        For the safety, transparency during buying ticket process, this information will be checked by the ticket
        inspector before getting aboard according to Viet Nam Railways's regulations
      </q-banner>
    </div>
    <q-form @submit="submitOrder">
      <div class="q-pa-md">
        <q-table
          :data="data"
          :columns="columns"
          row-key="name"
          hide-bottom
          class="my-sticky-header-table"
        >
          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <q-input filled dense
                       v-model="names[props.row.index]"
                       label="Full name"
                       class="q-mb-xs"
                       style="min-width: 300px"
                       :rules="[ val => val && val.length > 0 || 'Required name']"/>
              <q-select filled dense
                        v-model="idObjects[props.row.index]"
                        :options="objects"
                        label="Object"
                        class="q-mb-xs"
                        option-value="Id"
                        option-label="Name"
                        option-disable="inactive"
                        emit-value
                        map-options
                        :rules="[ val => val || 'Required object']"/>
              <q-input filled dense
                       v-model="identityNumbers[props.row.index]"
                       label="Passport"
                       :rules="[ val => val && val.length > 0|| 'Required passport/identity number']"/>
            </q-td>
          </template>
          <template v-slot:body-cell-code="props">
            <q-td :props="props">
              <div class="text-blue-9" v-if="props.row.countDown > 0">Locked for <span class="text-red-10">{{ props.row.countDown }}</span>
                second(s)
              </div>
              <div class="text-red-10" v-else>
                <q-icon name="report_problem" color="red" size="sm"/>
                Unlocked
              </div>
              <div>{{props.row.trainCode}} {{props.row.sourceName}} - {{props.row.destinationName}}</div>
              <div>{{props.row.departureDay}} {{props.row.departureTime | time}}</div>
              <div>Coach {{props.row.trainCarNumber}} seat {{props.row.seatNo}}</div>
              <div>{{props.row.trainCarType}}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-discount="props">
            <q-td :props="props" v-if="idObjects[props.row.index]">
              {{ objectType(idObjects[props.row.index]) }} %
            </q-td>
            <q-td :props="props" v-else>
              0%
            </q-td>
          </template>
          <template v-slot:body-cell-promotions="props">
            <q-td :props="props">
              No promotions for this ticket
            </q-td>
          </template>
          <template v-slot:body-cell-cost="props">
            <q-td :props="props" v-if="idObjects[props.row.index]">
              {{ Math.round((props.row.price - props.row.price / 100 * objectType(idObjects[props.row.index]))*100)/100 }}
            </q-td>
            <q-td :props="props" v-else>
              {{ props.row.price }}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense
                     flat
                     unelevated
                     icon="delete_outline"
                     color="blue-10"
                     size="lg"
                     @click="removeItem(props.row)"/>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="q-pa-md">
        <q-card class="my-card" bordered>
          <q-card-section>
            <div class="text-h6 text-red-9">Ticket booker information</div>
            <div class="text-blue-8">Please fill fully and exactly the follwing information of ticket buyer.<br/>
              This information will be used to verify ticket buyer information and to get ticket at the station before
              getting aboard according to Viet Nam Railways's regulations.
            </div>
          </q-card-section>

          <q-separator inset/>

          <q-card-section>
            <div class="row justify-center">
              <div class="col-3 q-ma-lg">
                <q-input label="Full name"
                         v-model="order.name"
                         :rules="[ val => val && val.length > 0|| 'Required name']"/>
              </div>
              <div class="col-3 q-ma-lg">
                <q-input
                  label="Email"
                  v-model="order.email"
                  :rules="[ val => val && val.length > 0 || 'Required emails']"/>
              </div>
              <div class="col-3 q-ma-lg">
                <q-input label="Phone number"
                         v-model="order.phone"
                         :rules="[ val => val && val.length > 0|| 'Required phone']"/>
              </div>
            </div>
            <div class="text-uppercase text-blue-8 text-h6">To prevent COVID-19 epidemic, VNR would like to ask you to
              enter correct phone number so that in case of need of notice we can contact you as quickly as possible.
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-md">
        <q-card class="my-card" bordered>
          <q-card-section>
            <div class="text-h6 text-red-9">Payment method (We only accept cards issued from Vietnam banks)</div>
          </q-card-section>

          <q-card-section>
            <q-list bordered>

              <q-item v-ripple>
                <q-radio v-model="radio" val="2"/>

                <div style="width: 10%">
                  <img width="100%" src="https://newsroom.mastercard.com/wp-content/uploads/2016/09/paypal-logo.png">
                </div>

                <q-item-section class="q-ml-md">
                  <div class="text-bold text-blue-8">We accept:</div>
                  <div>- QR PAY in Mobile Banking Application of Vietnam banks. Scan QR code to pay</div>
                  <div>- Internet banking/Bank account of Vietnam banks</div>
                </q-item-section>
              </q-item>

              <q-separator inset/>

              <q-item v-ripple>
                <q-radio v-model="radio" val="1"/>

                <div style="width: 12%" class="q-pt-lg">
                  <img width="100%" src="https://dsvn.vn/images/logo-dvtt-PayLater.png">
                </div>

                <q-item-section class="q-ml-md">
                  <div class="text-bold text-blue-8">Pay later at the agents of Vietnam Railways include:</div>
                  <div>- Ticket counters at the stations and ticketing agents of Vietnam Railways.</div>
                  <div>- VIB's payment addresses</div>
                  <div>- VNPost's payment addresses</div>
                  <div>- Payoo's payment addresses</div>
                  <div>- Payment via Internet Banking/Mobile banking/ATM</div>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>

        <div class="q-pt-lg">
          <q-btn color="blue-8" label="Back"></q-btn>
          <q-btn color="blue-8" class="float-right" type="submit" label="Submit Order"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import moment from 'moment'

  export default {
    data() {
      return {
        optionsNotification: {
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          position: "top-right"
        },
        names: [],
        idObjects: [],
        identityNumbers: [],
        order: {
          name: '',
          phone: '',
          email: ''
        },
        data: [],
        radio: '2',
        columns: [
          {
            name: "name",
            align: "left",
            label: "Full Name",
          },
          {
            name: "code",
            align: "left",
            label: "Ticket information",
          },
          {
            name: "price",
            align: "left",
            label: "Price",
            field: "price"
          },
          {
            name: "discount",
            align: "left",
            label: "Discount",
            field: "discount"
          },
          {
            name: "promotions",
            align: "left",
            label: "Promotions",
            field: "promotions"
          },
          {
            name: "cost",
            align: "left",
            label: "Cost ($)",
            field: "cost"
          },
          {
            name: "action",
            align: "left",
            label: "Remove",
            field: ""
          }
        ]
      }
    },
    watch: {
      isSaving(val) {
        if (val === false && this.radio === '1') {
          this.$q.notify({
            message: 'Submit order success. Have good day <3',
            color: 'green'
          })
          this.$router.push('/')
          this.$q.loading.hide()
        }
      }
    },
    computed: {
      ...mapState('ticket', [
        'cart',
        'objects',
        'isSaved',
        'isSaving'
      ])
    },
    created() {
      this.loadObjects()
    },
    mounted() {
      this.data = [...this.cart]
      this.data.forEach((row, index) => {
        row.index = index
      })
    },
    methods: {
      ...mapActions({
        loadObjects: 'ticket/loadObjects',
        saveOrder: 'ticket/submitOrder',
      }),
      objectType(id) {
        for (let item of this.objects) {
          if (item.Id === id) {
            return item.PricePercent
          }
        }
      },
      removeItem(props){
        this.data.splice(
          this.data.findIndex(
            x =>
              x.idTrainCar === props.idTrainCar &&
              x.idSeat === props.idSeat &&
              x.departureDay === props.departureDay
          ), 1)
      },
      submitOrder() {
        let rs = this.data.some(d=>d.countDown <= 0)
          if (rs){
            this.$q.notify({
              message: 'Please remove them from the ordered ticket list before making payment',
              color: 'red'
            })
          }else {
            this.$q.loading.show()
            let order = {
              tickets: [],
              typePayment: parseInt(this.radio),
              ...this.order
            }
            for (let i = 0; i < this.data.length; i++) {
              order.tickets.push({
                idSeat: this.data[i].idSeat,
                identityNumber: this.identityNumbers[i],
                name: this.names[i],
                idObject: this.idObjects[i],
                departureDay: this.data[i].departureDay,
                idTrainCar: this.data[i].idTrainCar,
                idSource: this.data[i].idSource,
                idDestination: this.data[i].idDestination
              })
            }
            this.saveOrder(order)
        }
      }
    }
  }
</script>
<style>

</style>

<style lang="sass">
  .my-sticky-header-table
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      /* bg color is important for th; just specify one */
      background-color: #e6e7f9
</style>
