<template>
  <div class="q-pa-sm">
    <q-btn
      flat
      rounded
      color="primary"
      label="Add Project"
      icon="add"
      @click="newMaterial = true"
    />
  </div>

  <div>
    <!-- <q-table
      title="Electrical Projects List"
      :rows="StoreElectricalProject.Projects"
      :columns="columns"
      row-key="_id"
      :visible-columns="[
        'Withdrawals',
        'ProjectName',
        'ReferenceNo',
        'TotalProjectCost',
        'ProjectIncharge',
        'TargetAccomplishment',
        'Location',
        'Status',
        'Actions',
      ]"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="Withdrawals" style="font-size: 11px" align="center">
            <q-btn
              flat
              icon="shopping_cart"
              color="green"
              style="font-size: 1em"
              @click="ViewProject(props.row._id, 'View Materials')"
            />
          </q-td>
          <q-td key="ProjectName" style="font-size: 11px" align="center">
            {{ props.row.ProjectName }}
          </q-td>
          <q-td key="ReferenceNo" style="font-size: 11px" align="center">
            {{ props.row.ReferenceNo }}
          </q-td>
          <q-td key="TotalProjectCost" style="font-size: 11px" align="center">
            {{ formatMoney(props.row.TotalProjectCost) }}
          </q-td>
          <q-td key="ProjectIncharge" style="font-size: 11px" align="center">
            {{ props.row.ProjectIncharge }}
          </q-td>
          <q-td
            key="TargetAccomplishment"
            style="font-size: 11px"
            align="center"
          >
            {{ formatDate(props.row.TargetAccomplishment) }}
          </q-td>
          <q-td key="Barangay" style="font-size: 11px" align="center">
            {{ props.row.Location.Barangay }}
          </q-td>

          <q-td key="Status" style="font-size: 11px" align="center">
            <q-chip :class="colorMyStatus(props.row.Status)">
              {{ props.row.Status }}
            </q-chip>
          </q-td>

          <q-td key="Actions" align="center">
            <q-btn
              flat
              icon="edit"
              color="primary"
              style="font-size: 1em"
              @click="ViewProject(props.row._id, 'View Project')"
            >
            </q-btn>
            <q-btn flat icon="delete" color="negative" style="font-size: 1em" />
          </q-td>
        </q-tr>
      </template>
    </q-table> -->
  </div>

  <q-dialog v-model="newMaterial" persistent>
    <q-card style="min-width: 800px">
      <q-card-section>
        <div class="text-h6">Material Information</div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col">
            <q-input type="text" label="Material Name" />
          </div>
          <div class="col">
            <q-input type="text" label="Amount Cost" prefix="₱" />
          </div>
          <div class="col">
            <q-input type="text" label="Unit" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="red" label="Cancel" v-close-popup />
        <q-btn color="primary" label="Save" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  setup() {},
  data() {
    return {
      Materials: [],
      Material: [],
      newMaterial: false,
    };
  },

  methods: {},
};
</script>
<style></style>
