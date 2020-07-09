<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Train"
      :data="listCode"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :pagination.sync="pagination"
      :loading="loading"
    >
      <template v-slot:top-right="props">
        <q-btn
          color="purple"
          label="Add new"
          @click="dialog = true"
          style="margin-right: 10px"
        />
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
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
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
            props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
          }}</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile" v-close-popup>{{
            mode === "grid" ? "List" : "Grid"
          }}</q-tooltip>
        </q-btn>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              dense
              color="primary"
              icon="edit"
              @click="showData(props.row)"
            />
            <q-btn
              dense
              color="red"
              icon="delete"
              @click="confirm(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Train Details</div>
        </q-card-section>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-card-section class="q-pt-none">
            <q-input
              filled
              v-model="form.code"
              label="Code *"
              lazy-rules
              :rules="[
                val => (val && val.length > 0) || 'Please type something'
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Submit" type="submit" />
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      filter: "",
      sortDefault: "createdAt",
      mode: "list",
      dialog: false,
      columns: [
        {
          name: "id",
          align: "left",
          label: "ID",
          field: "Id",
          sortable: true
        },
        {
          name: "code",
          align: "left",
          label: "Code",
          field: "Code",
          sortable: true
        },
        {
          name: "createdAt",
          align: "left",
          label: "Created at",
          field: "CreatedAt",
          sortable: true
        },
        {
          name: "updatedAt",
          align: "left",
          label: "Updated at",
          field: "UpdatedAt",
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
      listCode: [],
      pagination: {
        rowsPerPage: 10,
        sortBy: "createdAt",
        descending: true
      },
      form: {
        code: ""
      },
      isEdit: false,
      loading: false,
      currentItem: null,
      optionsNotification: {
        color: "green-4",
        textColor: "white",
        icon: "cloud_done"
      }
    };
  },
  async created() {
    await this.getData(this.$route.query);
  },
  methods: {
    ...mapActions({
      getListData: "train/getListData",
      createItem: "train/createItem",
      updateItem: "train/updateItem",
      deleteItem: "train/deleteItem"
    }),
    async getData(query) {
      this.loading = true;
      const data = await this.getListData(query);

      if (data) {
        this.loading = false;
        this.listCode = data || [];
      }
    },
    async onSubmit() {
      if (!this.isEdit) {
        const res = await this.createItem({
          ...this.form,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        // if(res.status === 201) {
        //   // k có api nên cái này tạm thời bỏ
        // }
        await this.getData(this.$router.query);

        this.$q.notify({
          ...this.optionsNotification,
          message: "Add successful"
        });
      } else {
        const res = await this.updateItem({
          id: this.currentItem.id,
          data: {
            ...this.currentItem,
            ...this.form
          }
        });

        await this.getData(this.$router.query);

        this.$q.notify({
          ...this.optionsNotification,
          message: "Update successful"
        });
      }
      this.dialog = false;
      this.onReset();
    },
    onReset() {
      this.form = {
        code: ""
      };
      this.isEdit = false;
    },
    showData(row) {
      this.dialog = true;
      this.isEdit = true;
      this.currentItem = row;
      this.form = {
        code: row.code
      };
    },
    confirm(row) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          const res = await this.deleteItem(row.id);

          this.$q.notify({
            ...this.optionsNotification,
            message: "Delete successful"
          });
          await this.getData(this.$router.query);
        });
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
