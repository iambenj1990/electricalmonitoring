<template>
  <div>
    <div class="q-pa-sm">
      <div class="q-pa-sm">
        <q-btn
          flat
          rounded
          color="primary"
          label="Recieve Request"
          icon="add"
          @click="clearEmptyValues(JOdata)"
        />
      </div>
      <div class="q-pa-md">
        <q-table
          title="Job Order Request List"
          :rows="JobOrderStore.JobOrders"
          :columns="columns"
          row-key="_id"
          :visible-columns="[
            'Request',
            'RequestedBy',
            'ContactNo',
            'Barangay',
            'Status',
            'Actions',
          ]"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td key="RequestDesc" style="font-size: 11px">
                {{ props.row.RequestDesc }}
              </q-td>
              <q-td key="RequestedBy" style="font-size: 11px">
                {{ props.row.RequestedBy }}
              </q-td>
              <q-td key="ContactNo" style="font-size: 11px" align="center">
                {{ props.row.ContactNo }}
              </q-td>
              <q-td key="Barangay" style="font-size: 11px">
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
                  @click="GetRequest(props.row._id)"
                />
                <q-btn
                  flat
                  icon="delete"
                  color="negative"
                  style="font-size: 1em"
                  @click="RemoveRequest(props.row)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>

    <div>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 1250px">
          <q-card-section>
            <div class="text-h6">Maintenance Request Information</div>
          </q-card-section>

          <q-separator></q-separator>

          <q-card-section>
            <div class="q-pa-xs">
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="JOdata.RequestDesc"
                    label="Request Description"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input v-model="JOdata.RequestedBy" label="Requested By" />
                </div>
                <div class="col">
                  <q-input
                    v-model="JOdata.ContactNo"
                    label="Contact No."
                    inputmode="numeric"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    v-model="selectedGroup"
                    label="Select Group"
                    :options="GroupStore.Groups"
                    behavior="menu"
                    option-label="GroupName"
                    emit-value
                    map-options
                  />
                </div>
                <div class="col">
                  <q-select
                    v-model="selectedSubGroup"
                    label="Select Sub-Group"
                    :options="selectedGroup.SubGroup"
                    behavior="menu"
                    option-label="SubGroupName"
                    emit-value
                    map-options
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No Sub-group Available at the moment
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col">
                  <q-select
                    v-model="selectedCluster"
                    label="Select Cluster"
                    :options="selectedSubGroup.GroupCluster"
                    behavior="menu"
                    option-label="ClusterName"
                    emit-value
                    map-options
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No Cluster Available at the moment
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    v-model="JOdata.Location.Barangay"
                    :options="Brgystore.barangay"
                    label="Barangay"
                  />
                </div>
                <div class="col">
                  <q-input v-model="JOdata.Location.Purok" label="Purok" />
                </div>
                <div class="col">
                  <q-input v-model="JOdata.Location.Street" label="Street" />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="JOdata.Remarks"
                    label="Remarks"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
          <q-card-actions align="right">
            <q-btn color="red" label="Cancel" v-close-popup />
            <q-btn
              color="primary"
              label="Save"
              v-close-popup
              @click="SaveNewRequest"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <!-- PARA SA UPDATE VIEWING SA DATA -->
    <div>
      <q-dialog v-model="forUpdateView" persistent>
        <q-card style="min-width: 1250px">
          <q-card-section>
            <div class="text-h6">Maintenance Request Information</div>
          </q-card-section>

          <q-separator></q-separator>

          <q-card-section>
            <div class="q-pa-xs">
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="JOdata.RequestDesc"
                    label="Request Description"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input v-model="JOdata.RequestedBy" label="Requested By" />
                </div>
                <div class="col">
                  <q-input
                    v-model="JOdata.ContactNo"
                    label="Contact No."
                    type="number"
                  />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    v-model="selectedGroup"
                    label="Select Group"
                    :options="GroupStore.Groups"
                    behavior="menu"
                    option-label="GroupName"
                    emit-value
                    map-options
                  />
                </div>
                <div class="col">
                  <q-select
                    v-model="selectedSubGroup"
                    label="Select Sub-Group"
                    :options="selectedGroup.SubGroup"
                    behavior="menu"
                    option-label="SubGroupName"
                    emit-value
                    map-options
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No Sub-group Available at the moment
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col">
                  <q-select
                    v-model="selectedCluster"
                    label="Select Cluster"
                    :options="selectedSubGroup.GroupCluster"
                    behavior="menu"
                    option-label="ClusterName"
                    emit-value
                    map-options
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-italic text-grey">
                          No Cluster Available at the moment
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="q-gutter-sm row">
                <div class="col">
                  <q-select
                    v-model="JOdata.Location.Barangay"
                    :options="Brgystore.barangay"
                    label="Barangay"
                  />
                </div>
                <div class="col">
                  <q-input v-model="JOdata.Location.Purok" label="Purok" />
                </div>
                <div class="col">
                  <q-input v-model="JOdata.Location.Street" label="Street" />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-select
                    v-model="JOdata.Status"
                    :options="StatusSelections"
                    label="Status"
                    style="width: 395px"
                  />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input
                    v-model="JOdata.Remarks"
                    label="Remarks"
                    type="textarea"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
          <q-card-actions align="right">
            <q-btn color="red" label="Cancel" v-close-popup />
            <q-btn
              color="primary"
              label="Update"
              v-close-popup
              @click="UpdateData(JOdata)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { usePhAddress } from "stores/TagumAddressStore.js";
//import {useGroupClusterStore} from 'stores/groupClusterStore.js';
import { useGroupingClusterStore } from "stores/groupingClusterStore.js";
import { useJobOrdersInfoStore } from "stores/JobOrderStore.js";

export default {
  data() {
    return {
      selectedGroup: [],
      selectedSubGroup: [],
      selectedCluster: [],
      selectedJobOrder: [],
      jobOrders: [],
      forUpdateView: ref(false),
      selectedStatus: ref(""),
      myColor: ref(""),

      JOdata: {
        RequestDesc: "",
        ContactNo: "",
        RequestedBy: "",
        AssignedGroup: "",
        AssignedSubGroup: "",
        Cluster: "",
        Remarks: "",
        Status: "",
        IsDeleted: false,
        Location: {
          0: {
            Barangay: "",
            Purok: "",
            Street: "",
          },
        },
      },

      columns: [
        {
          name: "ID",
          label: "ID",
          field: "_id",
          sortable: true,
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Request",
          label: "Request",
          field: "RequestDesc",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "RequestedBy",
          label: "Requested By",
          field: "RequestedBy",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ContactNo",
          label: "Contact No",
          field: "ContactNo",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Barangay",
          label: "Barangay",
          field: (row) => row.Location.Barangay,
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Status",
          label: "Status",
          field: "Status",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Actions",
          label: "Actions",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
      ],

      StatusSelections: ["Recieved", "On-going", "Finished"],
    };
  },

  mounted() {},
  created() {},

  setup() {
    const JobOrderStore = useJobOrdersInfoStore();
    const Brgystore = usePhAddress();
    const GroupStore = useGroupingClusterStore();
    GroupStore.fetchGroup();
    JobOrderStore.getJobOrders();

    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref(""),
      model: ref(null),
      Brgystore,
      GroupStore,
      JobOrderStore,
    };
  },

  computed: {},

  methods: {
    clearEmptyValues(obj) {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          this.clearEmptyValues(obj[key]);
        } else if (
          obj[key] === null ||
          obj[key] === undefined ||
          obj[key] === ""
        ) {
          obj[key] = "";
        }
      }
      this.prompt = true;
    },

    colorMyStatus(status) {
      switch (status) {
        case "Recieved":
          return {
            recieve: status === "Recieved",
          };
        case "On-going":
          return {
            ongoing: status === "On-going",
          };

        case "Finished":
          return {
            finish: status === "Finished",
          };
      }
    },

    async SaveNewRequest() {
      this.JOdata.AssignedGroup = this.selectedGroup.GroupName;
      this.JOdata.AssignedSubGroup = this.selectedSubGroup.SubGroupName;
      this.JOdata.Cluster = this.selectedCluster.ClusterName;
      this.JOdata.Status = "Recieved";

      const store = useJobOrdersInfoStore();
      await store.newJobOrder(this.JOdata).then((res) => {
        // console.log("Data is Saved!")
        store.getJobOrders();
      });
    },

    async GetRequest(val) {
      //console.log("ID => ", val)
      const store = useJobOrdersInfoStore();
      await store.getJobOrder(val).then((res) => {
        this.JOdata = store.JobOrder;
        (this.selectedGroup = this.JOdata.AssignedGroup),
          (this.selectedSubGroup = this.JOdata.AssignedSubGroup),
          (this.selectedCluster = this.JOdata.Cluster),
          console.log("Fetching => ", this.JOdata);
        this.forUpdateView = true;
      });
    },

    async RemoveRequest(payload) {
      // console.log("payload => ", payload)
      const store = useJobOrdersInfoStore();
      let data = payload;
      data.IsDeleted = true;
      // console.log("New Data => ", data)
      await store.UpdateJobOrder(data._id, data).then((res) => {
        store.getJobOrders();
      });
    },

    async UpdateData(payload) {
      payload.AssignedGroup = this.selectedGroup.GroupName;
      payload.AssignedSubGroup = this.selectedSubGroup.SubGroupName;
      payload.Cluster = this.selectedCluster.ClusterName;

      //  console.log(`payload => ${payload._id} ------->`, payload )
      // if empty value then replaced by "" specially for Groups that has no subgroup and cluster
      for (const pData in payload) {
        if (
          payload[pData] === null ||
          payload[pData] === undefined ||
          payload[pData] === ""
        ) {
          payload[pData] = "";
        }
      }
      const store = useJobOrdersInfoStore();
      await store.UpdateJobOrder(payload._id, payload).then((res) => {
        store.getJobOrders();
      });
      // this.selectedGroup=[];
      // this.selectedSubGroup=[];
      // this.selectedCluster=[];
    },
  },

  watch: {
    selectedGroup(newData) {
      // Whenever the data changes, check if it's empty and clear the selection if necessary
      //console.log("data=",newData)
      if (newData.SubGroup) {
        this.selectedSubGroup = [];
        this.selectedCluster = [];
      }
    },
  },
};
</script>
<style>
.finish {
  background-color: rgb(63, 45, 128);
  color: azure;
}

.ongoing {
  background-color: orange;
  color: azure;
}

.recieve {
  background-color: rgb(26, 173, 26);
  color: azure;
}
</style>
