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
            <q-input filled dense v-model="text" label="Full name" class="q-mb-xs"style="min-width: 300px"/>
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
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
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

    methods: {}
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
