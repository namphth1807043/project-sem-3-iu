<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Orders"
      :data="orders"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="Id"
      :grid="mode==='grid'"
      :filter="filter"
      :pagination.sync="pagination"
      @request="onRequest"
      :loading="isLoading"
    >
      <template v-slot:top-right="props">
        <q-input
          class="q-pr-md"
          outlined
          dense
          debounce="300"
          v-model="filter.code"
          label="Ticket code">
        </q-input>

        <q-input
          class="q-pr-md"
          outlined
          dense
          debounce="300"
          v-model="filter.name"
          label="Customer name">
        </q-input>

        <q-input
          class="q-pr-md"
          autocomplete="off"
          outlined
          dense
          debounce="300"
          v-model="filter.phone"
          label="Customer phone">
        </q-input>

        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter.email"
          label="Customer email">
        </q-input>

        <div class="q-ma-md" style="width: 270px;">
          <q-badge color="secondary" v-if="priceRange.min > 0">
            Price: {{ priceRange.min | formatInteger}} to {{ priceRange.max | formatInteger}} (0 to 10,000,000 VND)
          </q-badge>
          <q-badge color="secondary" v-else>
            Price: 0 to {{ priceRange.max | formatInteger}} (0 to 10,000,000 VND)
          </q-badge>

          <q-range
            v-model="priceRange"
            :min="0"
            :max="10000000"
            @change="price"
          />
        </div>

        <div>
          <date-range-picker
            ref="picker"
            :showWeekNumbers="true"
            :showDropdowns="true"
            :autoApply="true"
            v-model="dateRange"
            class="q-ml-md"
            toggle="true"
            @update="updateValues"
          >
            <template v-slot:input="picker" class="date-picker"
                      v-if="Object.keys(dateRange).length === 0 && dateRange.constructor === Object">
              Created at
            </template>
            <template v-slot:input="picker" class="date-picker" v-else>
              {{ picker.startDate | filterDate}} - {{ picker.endDate | filterDate}}
            </template>
          </date-range-picker>
        </div>

        <div class="q-pl-md q-pr-sm" style="width: 200px">
          <div class="q-gutter-md">
            <q-select
              clearable
              dense
              outlined
              v-model="filter.status"
              :options="statuses"
              label="Status"
              emit-value
              map-options
            />
          </div>
        </div>

        <q-btn class="q-ma-sm" label="clear" color="purple-7" @click="clearFilters"/>
        <q-btn
          class="q-mr-sm"
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="mode = mode === 'grid' ? 'list' : 'grid';
          separator = mode === 'grid' ? 'none' : 'horizontal'"
          v-if="!props.inFullscreen"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{mode==='grid' ? 'List' : 'Grid'}}
          </q-tooltip>
        </q-btn>

        <q-btn
          class="q-mx-none"
          color="primary"
          icon-right="archive"
          label="Export"
          @click="exportTable"
        />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ index(props.row.Id) }}
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props" class="text-capitalize">
          {{ props.row.Name }}
        </q-td>
      </template>
      <template v-slot:body-cell-total_price="props">
        <q-td :props="props">
          {{ props.row.TotalPrice | formatInteger }}
        </q-td>
      </template>
      <template v-slot:body-cell-created_at="props">
        <q-td :props="props">
          {{ props.row.CreatedAt | filterDateTime }}
        </q-td>
      </template>
      <template v-slot:body-cell-updated_at="props">
        <q-td :props="props" v-if="props.row.UpdatedAt">
          {{ props.row.UpdatedAt | filterDateTime }}
        </q-td>
        <q-td :props="props" v-else>
          Chưa cập nhật
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="(props.row.Status === 2)?'green':(props.row.Status === 1?'orange':'red')"
            text-color="white"
            dense
            class="text-weight-bolder"
            square
          >{{props.row.Status | filterOrderStatus}}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-detail="props">
        <q-td :props="props">
          <q-btn
            dense
            color="primary"
            icon="pageview"
            @click="viewOderDetail(props.row)"/>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm" v-if="props.row.Status === 1">
            <q-btn dense
                   color="green"
                   icon="check"
                   @click="confirm(props.row, 2)"/>
            <q-btn dense
                   color="red"
                   icon="clear"
                   @click="confirm(props.row, 0)"/>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog full-width v-model="isLoadOrderDetail">
      <q-card>
        <q-card-section>
          <order-detail :orderId="orderId"></order-detail>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {exportFile} from "quasar";
  import {mapState, mapActions} from 'vuex'
  import '../utils/filter'
  import {Constants} from '../utils/const'
  import OrderDetail from '../pages/order-detail'
  import DateRangePicker from 'vue2-daterange-picker'
  import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
  import {httpClient} from "src/api/http";
  import moment from 'moment'
  function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;

    formatted =
      formatted === void 0 || formatted === null ? "" : String(formatted);

    formatted = formatted.split('"').join('""');

    return `"${formatted}"`;
  }

  export default {
    data() {
      return {
        orderId: null,
        priceRange: {
          min: 0,
          max: 10000000
        },
        isLoadOrderDetail: false,
        dateRange: {},
        mode: "list",
        pagination: {
          page: 1,
          rowsPerPage: 15,
          rowsNumber: 0
        },
        columns: [
          {
            name: "index",
            align: "left",
            label: "Index",
            field: "index"
          },
          {
            name: "name",
            align: "left",
            label: "Customer Name",
            field: "Name"
          },
          {
            name: "phone",
            align: "left",
            label: "Customer Phone",
            field: "Phone"
          },
          {
            name: "email",
            align: "left",
            label: "Customer Email",
            field: "Email"
          },
          {
            name: "total_price",
            align: "left",
            label: "Total Price (VND)",
            field: "TotalPrice"
          },
          {
            name: "created_at",
            align: "left",
            label: "Created At",
            field: "CreatedAt"
          },
          {
            name: "updated_at",
            align: "left",
            label: "Updated At",
            field: "UpdatedAt"
          },
          {
            name: "status",
            align: "left",
            label: "Status",
            field: "Status"
          },
          {
            name: "detail",
            align: "left",
            label: "Detail",
            field: "Detail"
          },
          {
            name: "action",
            align: "left",
            label: "Action",
            field: "action"
          }
        ],
        optionsNotification: {
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          position: "top-right"
        }
      };
    },
    components: {
      DateRangePicker,
      OrderDetail
    },
    watch: {
      isSaved(){
        this.onRequest({
          pagination: this.paging
        })
      }
    },
    computed: {
      ...mapState('order', ['orders', 'paging', 'isLoading', 'filter', 'order', 'isSaving','isSaved']),
      statuses: function () {
        return Constants.OrderStatus
      },

    },
    mounted() {
      this.onRequest({
        pagination: this.pagination
      })
    },
    methods: {
      ...mapActions({
        loadOrders: 'order/loadOrders',
        updateOrder: 'order/updateOrder',
        clearFilter: 'order/clearFilter'
      }),
      index: function (id) {
        return this.orders.findIndex(x => x.Id === id) + 1;
      },
      exportTable() {
        // naive encoding to csv format
        const content = [this.columns.map(col => wrapCsvValue(col.label))]
          .concat(
            this.orders.map(row =>
              this.columns
                .map(col =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const fileStatus = exportFile("quotes.csv", content, "text/csv");

        if (fileStatus !== true) {
          this.$q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning"
          });
        }
      },
      onRequest(props) {
        const {page, rowsPerPage} = props.pagination
        this.pagination = this.paging
        this.loadOrders({
          filter: this.filter,
          page: page,
          size: rowsPerPage
        })
      },
      confirm(order, status) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Are you sure?",
            cancel: true,
            persistent: true
          })
          .onOk(async () => {
            order.status = status
            this.updateOrder({
              order : order
            })
            this.$q.notify({
              ...this.optionsNotification,
              message: "Confirm successful"
            });
          });
      },
      viewOderDetail(order) {
        this.orderId = order.Id
        this.isLoadOrderDetail = true
      },
      clearFilters() {
        this.dateRange = {}
        this.clearFilter()
      },
      updateValues() {
        let startDate = moment(this.dateRange.startDate).format('DD MMM YYYY')
        let endDate = moment(this.dateRange.endDate).format('DD MMM YYYY')
        this.loadOrders({
          filter : {
            ...this.filter,
            startDate : startDate,
            endDate: endDate
          },
          page: this.pagination.page,
          size: this.pagination.rowsPerPage
        })
      },
      price() {
        this.loadOrders({
          filter : {
            ...this.filter,
            minPrice: this.priceRange.min,
            maxPrice: this.priceRange.max
          },
          page: this.pagination.page,
          size: this.pagination.rowsPerPage
        })
      }
    }
  };
</script>
<style>
  .vue-daterange-picker .reportrange-text {
    width: 200px;
    border-radius: 5px;
    padding: 9px;
    color: #757575;
  }

  .vue-daterange-picker .reportrange-text:hover {
    border-color: black;
  }
</style>
