<template>
  <div>
    <div class="q-pa-sm">
      <div class="q-pa-sm">
        <q-btn
          flat
          rounded
          color="primary"
          label="Add Project"
          icon="add"
          @click="prompt = true"
        />
      </div>
            <div class="q-pa-md">
              <q-table
                title="Job Order Request List"
                :rows="JobOrderStore.JobOrders"
                :columns="columns"
                row-key="name"
              />
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
                  <q-input v-model="RequestDesc" label="Request Description" />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                  <q-input v-model="RequestedBy" label="Requested By" />
                </div>
                <div class="col">
                  <q-input v-model="ContactNo" label="Contact No." />
                </div>
              </div>
              <div class="q-gutter-md row">
                <div class="col">
                          <q-select
                            v-model="selectedGroup"
                            label="Select Group"
                            :options=GroupStore.Groups
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
                            :options=selectedGroup.SubGroup
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
                            :options=selectedSubGroup.GroupCluster
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
                    v-model="Barangay"
                    :options="Brgystore.barangay"
                    label="Barangay"
                  />
                </div>
                <div class="col">
                  <q-input v-model="Purok" label="Purok" />
                </div>
                <div class="col">
                  <q-input v-model="Street" label="Street" />
                </div>
              </div>

              <div class="q-gutter-md row">
                <div class="col">
                  <q-input v-model="Remarks" label="Remarks" type="textarea" />
                </div>
              </div>

          </div>
          </q-card-section>

          <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
          <q-card-actions align="right">
            <q-btn color="red" label="Cancel" v-close-popup />
            <q-btn color="primary" label="Save" v-close-popup />
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
import {useJobOrdersInfoStore} from "stores/JobOrderStore.js"

export default {
  data() {
    return {
      RequestDesc: "",
      ContactNo: "",
      RequestedBy: "",
      Remarks: "",
      Barangay: null,
      Purok: "",
      Street: "",
      Group: null,
      selectedGroup: [],
      selectedSubGroup: [],
      selectedCluster: [],
      selectedJobOrder:[],


    };
  },

  mounted() {  },
  created() {  },

  setup() {
    const JobOrderStore = useJobOrdersInfoStore();
    const Brgystore = usePhAddress();
    const GroupStore = useGroupingClusterStore();
    GroupStore.fetchGroup();

    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref(""),
      model: ref(null),
      Brgystore,
      GroupStore,
      JobOrderStore,
      JOdata:{
        RequestDesc: "",
        ContactNo: "",
        RequestedBy:"",
        AssignedGroup: "",
        Cluster: "",
        Remarks:"",
        Status: "",
        IsDeleted: false,
        Location: {
            0:{
                  Barangay: String,
                  Purok: String,
                  Street: String,
              },
                  },
            },


      columns: [
          { name: 'ID', label: 'ID', field: '_id', sortable: true, align: 'left', headerClasses: 'bg-grey-7 text-white', },
          { name: 'Request', label: 'Request', field: 'RequestDesc',headerClasses: 'bg-grey-7 text-white', },
          { name: 'RequestedBy', label: 'Requested By', field: 'RequestedBy', headerClasses: 'bg-grey-7 text-white',},
          { name: 'ContactNo', label: 'Contact No', field: 'ContactNo',headerClasses: 'bg-grey-7 text-white', },
          { name: 'Location', label: 'Barangay', field: 'Location.Barangay',headerClasses: 'bg-grey-7 text-white', },
          { name: 'Status', label: 'Status', field: 'Status',headerClasses: 'bg-grey-7 text-white',},
          { name: 'Actions', label: 'Actions',headerClasses: 'bg-grey-7 text-white',},
      ],


    };
  },

  computed: {

  },

  methods: {
              SaveNewRequest(){
                const store = useJobOrdersInfoStore();
                store
                  .newJobOrder(this.JOdata).then((res)=> {
                    this.JOdata

                  })

              },

  },

  watch: {
    selectedGroup(newData) {
      // Whenever the data changes, check if it's empty and clear the selection if necessary
      //console.log("data=",newData)
      if (newData.SubGroup) {
        this.selectedSubGroup = [];
        this.selectedCluster=[];
      }
    },
  },
};
</script>
