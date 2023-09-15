<template>
  <div>
         <div class="q-pa-sm">
              <div class="q-pa-sm  " >
                    <q-btn flat rounded color="primary" label="Add Project" icon="add" @click="prompt = true"/>
                </div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">LOCATION</th>
            <th class="text-center">REQUEST DESCRIPTION</th>
            <th class="text-center">REQUESTED BY</th>
            <th class="text-center">ASSIGNED GROUP</th>
            <th class="text-center">CLUSTER</th>
            <th class="text-center">REMARKS</th>
            <th class="text-center">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Frozen Yogurt</td>
            <td class="text-center">159</td>
            <td class="text-center">6</td>
            <td class="text-center">24</td>
            <td class="text-center">4</td>
            <td class="text-center">87</td>
            <td class="text-center">
              <q-btn color="primary" icon="visibility" @click="prompt = true" />&nbsp;
              <q-btn color="red" icon="delete"   />
            </td>
          </tr>


        </tbody>
      </q-markup-table>
    </div>

    <div>
      <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 650px">
        <q-card-section>
          <div class="text-h6">Maintenance Request Information</div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="q-pa-xs">
               <div class="q-gutter-md row ">
                    <div class="col">
                      <q-input v-model="RequestDesc" label="Request Description" />
                    </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                       <q-input v-model="RequestedBy" label="Requested By" />
                  </div>
                  <div class="col">
                    <q-input v-model="ContactNo" label="Contact No." />
                  </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                       <q-select v-model="AssignedGroup" :options="options" label="Assigned Group" />
                  </div>
                  <div class="col">
                    <q-select v-model="selectedSubItem" :options="subItemsForSelectedMainItem" label="Cluster" />
                  </div>
                  <div class="col">
                    <q-select v-model="Cluster" :options="subItemForSelectedThirdItem" label="Cluster Description" />
                  </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                    <q-select v-model="Barangay" :options="options" label="Barangay" />
                  </div>
                  <div class="col">
                    <q-select v-model="Purok" :options="options" label="Purok" />
                  </div>
                  <div class="col">
                    <q-input v-model="Street" label="Street" />
                  </div>
              </div>

              <div class="q-gutter-md row ">
                  <div class="col">
                    <q-input v-model="Remarks" label="Remarks" type="textarea" />
                  </div>

              </div>



          </div>
        </q-card-section>


          <!-- <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" /> -->
        <q-card-actions align="right" >
          <q-btn color="red" label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </div>
  </div>


  </template>

  <script>
  import { defineComponent, ref } from 'vue'

  export default {
    data(){
       return{
        RequestDesc: "",
        ContactNo: "",
        RequestedBy:"",
        Remarks:"",
        Barangay: "",
        Purok: "",
        Street: "",

        AssignedGroup: null,
        selectedSubItem: null,
        Cluster: null,

        options: [
        'B1 - LSB',
        'B2 - BLDG MAINTENANCE',
        'B3 - CLEARING',
        'B4 - RAC MAINTENANCE',
        'B5 - COMMUNICATIONS/TELEPHON CABLE -RROW',
        'B6 - STREET LIGHTS',
        'B7 - OTHERS',
        ],
        subCluster: {
          'B6 - STREET LIGHTS' : ['B61 - CLUSTER 1','B62 - CLUSTER 2']
        },
        thirdItems: {
          'B61 - CLUSTER 1':  ['B611 - METERED' , 'B612 - FLATRATE' , 'B613 - SOLAR'],
          'B62 - CLUSTER 2':  ['B621 - METERED' , 'B622 - FLATRATE' , 'B623 - SOLAR'],
        }
       }
    },
    setup(){
      return {
        alert: ref(false),
        confirm: ref(false),
        prompt: ref(false),
        address: ref(''),
        model: ref(null),
      }
    },

    computed: {
      subItemsForSelectedMainItem() {
          return this.AssignedGroup ? this.subCluster[this.AssignedGroup] : [];
      },
      subItemForSelectedThirdItem() {
          return this.selectedSubItem ? this.thirdItems[this.selectedSubItem] : [];
      }
    }
  }



  </script>
