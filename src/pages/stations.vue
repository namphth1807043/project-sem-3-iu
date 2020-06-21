<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Stations"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="name"
      :grid="mode==='grid'"
      :filter="filter"
      :pagination.sync="pagination"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
          v-if="!props.inFullscreen"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{mode==='grid' ? 'List' : 'Grid'}}
          </q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="(props.row.status === 1)?'green':'red'"
            text-color="white"
            dense
            class="text-weight-bolder"
            square
          >{{props.row.status | filterStatus}}
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn dense color="primary" icon="edit"/>
            <q-btn dense color="red" icon="delete"/>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
  import {exportFile} from "quasar";
  import '../utils/filter'

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
        filter: '',
        loading: false,
        pagination: {
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 3,
          rowsNumber: 10
        },
        mode: "list",
        columns: [
          {
            name: "index",
            align: "left",
            label: "Index",
            field: "index",
            sortable: true
          },
          {
            name: "code",
            align: "left",
            label: "Code",
            field: "code",
            sortable: true
          },
          {
            name: "created_at",
            align: "left",
            label: "Created At",
            field: "created_at",
            sortable: true
          },
          {
            name: "updated_at",
            align: "left",
            label: "Updated At",
            field: "updated_at",
            sortable: true
          },
          {
            name: "status",
            align: "left",
            label: "Status",
            field: "status",
            sortable: true
          },
          {
            name: "action",
            align: "left",
            label: "Action",
            field: "action",
            sortable: true
          }
        ],
        data: [
          {
            code: "HP7",
            created_at: "14/05/2020",
            updated_at: "14/05/2020",
            status: 1
          },
          {
            code: "HP7",
            created_at: "14/05/2020",
            updated_at: "14/05/2020",
            status: 1
          },
          {
            code: "HP7",
            created_at: "14/05/2020",
            updated_at: "14/05/2020",
            status: 0
          },
          {
            code: "HP7",
            created_at: "14/05/2020",
            updated_at: "14/05/2020",
            status: 1
          }
        ]
      };
    },
    mounted () {
      // get initial data from server (1st page)
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    methods: {
      exportTable() {
        // naive encoding to csv format
        const content = [this.columns.map(col => wrapCsvValue(col.label))]
          .concat(
            this.data.map(row =>
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
      onRequest (props) {
        const { page, rowsPerPage, sortBy, descending } = props.pagination
        const filter = props.filter

        this.loading = true

        // emulate server
        setTimeout(() => {
          // update rowsCount with appropriate value
          this.pagination.rowsNumber = this.getRowsNumberCount(filter)

          // get all rows if "All" (0) is selected
          const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

          // calculate starting row of data
          const startRow = (page - 1) * rowsPerPage

          // fetch data from "server"
          const returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

          // clear out existing data and add new
          this.data.splice(0, this.data.length, ...returnedData)

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        }, 1500)
      },

      // emulate ajax call
      // SELECT * FROM ... WHERE...LIMIT...
      fetchFromServer (startRow, count, filter, sortBy, descending) {
        const data = filter
          ? this.data.filter(row => row.name.includes(filter))
          : this.data.slice()

        // handle sortBy
        if (sortBy) {
          const sortFn = sortBy === 'desc'
            ? (descending
                ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
                : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            )
            : (descending
                ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
                : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
            )
          data.sort(sortFn)
        }

        return data.slice(startRow, startRow + count)
      },

      // emulate 'SELECT count(*) FROM ...WHERE...'
      getRowsNumberCount (filter) {
        if (!filter) {
          return this.data.length
        }
        let count = 0
        this.data.forEach((treat) => {
          if (treat.name.includes(filter)) {
            ++count
          }
        })
        return count
      }
    }
  };
</script>
<style>
  .q-chip__content {
    display: block;
    text-align: center;
  }
</style>
