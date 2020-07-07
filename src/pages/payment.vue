<template>
  <q-page class="flex-center">
    <q-chip square
            style="background-color: #0382c1"
            text-color="white"
            class="q-mt-md q-ml-md">
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
            <q-input filled dense v-model="text" label="Full name" class="q-mb-xs" style="min-width: 300px"/>
            <q-select filled dense v-model="text" :options="options" label="Object" class="q-mb-xs"/>
            <q-input filled dense v-model="text" label="Passport"/>
          </q-td>
        </template>
        <template v-slot:body-cell-code="props">
          <q-td :props="props">
            <div class="text-blue-9">Locked for <span class="text-red-10">525</span> second(s)</div>
            <div>HP1 Hà Nội-Hải Phòng</div>
            <div>12/07/2020 06:00</div>
            <div>Coach 1 seat 41</div>
            <div>Soft seat, air-conditioned</div>
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md">
      <q-card class="my-card" bordered>
        <q-card-section>
          <div class="text-h6 text-red-9">Ticket booker information</div>
          <div class="text-blue-8">Please fill fully and exactly the follwing information of ticket buyer.<br/>
          This information will be used to verify ticket buyer information and to get ticket at the station before getting aboard according to Viet Nam Railways's regulations.</div>
        </q-card-section>

        <q-separator inset/>

        <q-card-section>
          <div class="row" style="padding-left: 18%">
            <div class="col-2 q-ma-lg">
                  <q-input label="Full name" v-model="text"></q-input>
            </div>
            <div class="col-2 q-ma-lg">
                  <q-input label="ID/Passport number" v-model="text"></q-input>
            </div>
            <div class="col-2 q-ma-lg">
              <q-input label="Email" v-model="text"></q-input>
            </div>
            <div class="col-2 q-ma-lg">
              <q-input label="Phone number" v-model="text"></q-input>
            </div>
          </div>
          <div class="text-uppercase text-blue-8 text-h6">To prevent COVID-19 epidemic, VNR would like to ask you to enter correct phone number so that in case of need of notice we can contact you as quickly as possible.</div>
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
              <q-radio v-model="radio" val="paypal" />

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
              <q-radio v-model="radio" val="money" />

              <div style="width: 10%;" class="q-pt-md">
                <img width="100%" height="80%" src="https://dsvn.vn/images/logo-dvtt-PayLater.png">
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
        <q-btn color="blue-8"  label="Back"></q-btn>
        <q-btn color="blue-8" class="float-right" label="Submit Order" @click="submitOrder" to="/"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        optionsNotification: {
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          position: "top-right"
        },
        text: null,
        radio: null,
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
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
            name: "insurance",
            align: "left",
            label: "Insurance",
            field: "insurance"
          },
          {
            name: "cost",
            align: "left",
            label: "Cost ($)",
            field: "cost"
          }
        ],
        data: [
          {
            price: 84000,
            discount: 8000,
            promotions: 'No promotions for this ticket',
            insurance: 1,
            cost: 85000
          },
          {
            price: 84000,
            discount: 8000,
            promotions: 'No promotions for this ticket',
            insurance: 1,
            cost: 85000
          },
          {
            price: 84000,
            discount: 8000,
            promotions: 'No promotions for this ticket',
            insurance: 1,
            cost: 85000
          },
          {
            price: 84000,
            discount: 8000,
            promotions: 'No promotions for this ticket',
            insurance: 1,
            cost: 85000
          }
        ]
      }
    },

    methods: {
      submitOrder(){
        this.$q.notify({
          message: "Order Success. Check tickets information at email. See you next time <3",
          color: 'green',
          icon: "check_circle_outline"
        });
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
