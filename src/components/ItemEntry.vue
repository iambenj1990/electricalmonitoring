<template>
  <div class="q-pt-xl row">
    <div class="q-pa-sm col">
      <q-btn
        flat
        rounded
        color="primary"
        label="Add Materials"
        icon="add"
        @click="newMaterial = true"
      />
    </div>
    <div class="q-pa-sm col" align="right">
      <q-btn
        flat
        rounded
        color="primary"
        label="Upload Excel"
        @click="bulkNewMaterial = true"
      />
    </div>
  </div>
  <q-separator></q-separator>

  <div class="q-pa-md row" style="align-items: baseline">
    <div class="col-3">
      <q-select
        :options="MaterialCategory"
        v-model="Material_Category"
        label="Select Category"
        style="width: 290px"
      />
    </div>

    <div class="col-9">
      <div align="right">
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          style="width: 290px"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <q-table
      :rows="storeMaterials.Materials"
      :columns="Materialcolumns"
      row-key="_id"
      :visible-columns="[
        'MaterialName',
        'MaterialCost',
        'MaterialUnit',
        'Actions',
      ]"
      :filter="filter"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="MaterialName" style="font-size: 11px" align="center">
            {{ props.row.MaterialName }}
          </q-td>
          <q-td key="MaterialCost" style="font-size: 11px" align="center">
            {{ props.row.MaterialCost }}
          </q-td>
          <q-td key="MaterialUnit" style="font-size: 11px" align="center">
            {{ props.row.MaterialUnit }}
          </q-td>
          <q-td key="Actions" align="center">
            <q-btn
              flat
              icon="delete"
              color="negative"
              style="font-size: 1em"
              @click="DeleteEntryData(props.row._id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="newMaterial" persistent>
    <q-card style="min-width: 900px">
      <q-card-section>
        <div class="text-h6">Material Information</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col">
            <q-input
              type="text"
              label="Material Name"
              v-model="Material.MaterialName"
            />
          </div>
          <div class="col">
            <q-input
              type="text"
              label="Amount Cost"
              prefix="₱"
              v-model="Material.MaterialCost"
            />
          </div>
          <div class="col">
            <q-input type="text" label="Unit" v-model="Material.MaterialUnit" />
          </div>
        </div>
        <div class="q-gutter-md row">
          <div class="col">
            <q-select
              :options="MaterialCategory"
              v-model="Material.MaterialCategory"
              label="Select Category"
              style="width: 290px"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="red" label="Cancel" v-close-popup />
        <q-btn
          color="primary"
          label="Save"
          v-close-popup
          @click="EntryNewMaterial(Material)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="bulkNewMaterial" persistent>
    <q-card style="min-width: 800px">
      <q-card-section>
        <div class="text-h6">Upload Bulk Material Information</div>
      </q-card-section>
      <bulkUpload></bulkUpload>
    </q-card>
  </q-dialog>

  <q-dialog v-model="successResult" persistent>
    <q-card style="min-width: 800px">
      <q-card-section>
        <div class="text-h6">{{ this.successResultMessage.Header }}</div>
      </q-card-section>
      <q-card-section>
        {{ this.successResultMessage.Message }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="red"
          label="OK"
          @click="successResult = false"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { useMaterialStore } from "stores/Materials.js";
import bulkUpload from "components/UploadItem.vue";
export default {
  components: {
    bulkUpload,
  },

  setup() {
    const storeMaterials = useMaterialStore();
    storeMaterials.getMaterials().then(() => {
      setInterval(2000);
      console.log("Materials List =>", storeMaterials.Materials);
    });

    return {
      storeMaterials,
    };
  },

  data() {
    return {
      filter: ref(""),
      Materials: [],
      Material: {},
      newMaterial: false,
      bulkNewMaterial: false,
      MaterialCategory: [
        "Cables/Wires",
        "Automatics/Controllers",
        "Lighting",
        "Renewable Energy",
        "Tools",
      ],
      Material_Category: "",
      successResult: false,
      successResultMessage: {
        Header: "",
        Message: "",
      },
      Materialcolumns: [
        {
          name: "_id",
          label: "ID",
          field: "_id",
          //sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialName",
          label: "Name",
          field: "MaterialName",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialCost",
          label: "Cost",
          field: "MaterialCost",
          // sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialUnit",
          label: "Unit",
          field: "MaterialUnit",
          // sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Actions",
          label: "Actions",
          //field: "MaterialUnit",
          // sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
      ],
    };
  },

  methods: {
    async EntryNewMaterial(payload) {
      console.log(payload);
      try {
        await this.storeMaterials.newMaterial(payload).then(() => {
          this.storeMaterials.getMaterials();

          this.successResultMessage.Header = "Successfuly Saved.";
          this.successResultMessage.Message =
            "Entered Material successfuly saved to database ";
          this.successResult = true;
        });
      } catch (error) {
        this.successResultMessage.Header = error.Header;
        this.successResultMessage.Message = error.Message;
        this.successResult = true;
      }
    },

    async DeleteEntryData(id) {
      console.log("Selected ID=> ", id);
      try {
        await this.storeMaterials.removeMaterial(id).then(() => {
          this.storeMaterials.getMaterials();
          this.successResultMessage.Header = "Successfuly Deleted.";
          this.successResultMessage.Message =
            "Entered Material successfuly Deleted from database ";
          this.successResult = true;
        });
      } catch (error) {
        this.successResultMessage.Header = error.Header;
        this.successResultMessage.Message = error.Message;
        this.successResult = true;
      }
    },
  },
};
</script>
<style></style>
