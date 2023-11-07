<template>

<div class="q-pa-sm">
  <div class="q-pa-sm  " >
      <q-btn flat rounded color="primary" label="Add Project" icon="add" />
  </div>
   <div>
    <q-table
                title="Electrical Projects List"
                :rows="ElectricalProject.Projects"
                :columns="columns"

    />
   </div>
  </div>
</template>

<script>
import {  ref } from 'vue'
import {useProjectInfoStore} from 'stores/projectStore.js'
import { usePhAddress } from "stores/TagumAddressStore.js"



export default {
  data() {
    return {
        eProjects:[],
        StatusSelections :[ "Recieved","On-going","Finished"],





        columns:[
                {name: 'ID', label: 'ID', field: '_id', sortable: true, align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'ProjectName', label: 'Project Name', field: 'ProjectName', sortable: true, align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'ReferenceNo', label: 'Reference No', field: 'ReferenceNo', sortable: true, align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'TotalProjectCost', label: 'Total Project Cost', field: 'TotalProjectCost',  align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'ProjectIncharge', label: 'Project Incharge', field: 'ProjectIncharge', sortable: true, align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'TargetAccomplishment', label: 'Target Accomplishment', field: 'TargetAccomplishment', align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' },
                {name: 'Location', label: 'Location', field: 'Location', align: 'left', headerClasses: 'bg-grey-7 text-white', headerStyle: 'font-size: 1.2 em' }

        ],
    }

  },

  setup() {
    const ElectricalProject = useProjectInfoStore()
    const Brgystore = usePhAddress()

    ElectricalProject.getProjects()
    console.log( "Prject Data list ==> ",ElectricalProject.Projects)

  }



};

</script>
