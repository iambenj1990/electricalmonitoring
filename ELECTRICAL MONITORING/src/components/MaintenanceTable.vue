<template>

  <div class="q-pa-sm">
    <div class="q-pa-sm  " >
        <q-btn flat rounded color="primary" label="Add Project" icon="add" @click="prompt = true"/>
    </div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">LOCATION</th>
            <th class="text-center">REQUEST DESCRIPTION</th>
            <th class="text-center">REQUESTEE</th>
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
              <q-btn color="primary" icon="edit" />&nbsp;
              <q-btn color="red" icon="delete"  />
            </td>
          </tr>


        </tbody>
      </q-markup-table>
    </div>

    <div>
      <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 650px">
        <q-card-section>
          <div class="text-h6">Request Information</div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="q-pa-xs">
               <div class="q-gutter-md row ">
                    <div class="col">
                      <q-input v-model="text" label="Request Description" />
                    </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                       <q-input v-model="text" label="Requested By" />
                  </div>
                  <div class="col">
                    <q-input v-model="text" label="Contact No." />
                  </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                       <q-select v-model="model" :options="options" label="Assigned Group" />
                  </div>
                  <div class="col">
                    <q-select v-model="model" :options="options" label="Cluster" />
                  </div>

              </div>
              <div class="q-gutter-md row ">
                  <div class="col">
                    <q-select v-model="model" :options="options" label="Barangay" />
                  </div>
                  <div class="col">
                    <q-select v-model="model" :options="options" label="Purok" />
                  </div>
                  <div class="col">
                    <q-input v-model="text" label="Street" />
                  </div>
              </div>

              <div class="q-gutter-md row ">
                  <div class="col">
                    <q-input v-model="text" label="Remarks" type="textarea" />
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

  </template>

  <script>
  import { defineComponent, ref } from 'vue'

  export default {
    setup(){
      return {
        alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),

      address: ref(''),
      model: ref(null),
      options: [
        'B1 - LSB',
        'B2 - BLDG MAINTENANCE',
        'B3 - CLEARING',
        'B4 - RAC MAINTENANCE',
        'B5 - COMMUNICATIONS/TELEPHON CABLE -RROW',
        'B6 - STREET LIGHTS',
        'B7 - OTHERS',
        ],
      Clusters :[
        'B61',
        'B62',
      ],
      subClusters :[
        
      ]

      }
    }
  }



  </script>
