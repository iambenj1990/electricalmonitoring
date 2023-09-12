<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title></q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="space_dashboard" />
              </q-item-section>

              <q-item-section>
                DASHBOARD
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple @click="toggleSection('mRequest')">
              <q-item-section avatar>
                <q-icon name="electrical_services" />
              </q-item-section>

              <q-item-section>
                ELECTRICAL MAINTENANCE
              </q-item-section>

            </q-item>

            <q-item clickable v-ripple @click="toggleSection('Projects')">
              <q-item-section avatar>
                <q-icon name="batch_prediction" />
              </q-item-section>

              <q-item-section>
                PROJECTS
              </q-item-section>
            </q-item>

            
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Neil Benjamin Roble</div>
            <div>@Nebenosaur</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <!-- <q-page padding> -->
           <q-page-container v-if='showMaintenance'> 
              <MaintenanceTable />
          </q-page-container> 
             <q-page-container v-if='showProjects'> 
              <ProjectTable />
          </q-page-container> 
          
          <!-- DIRI ISULOD ANG MGA COMPONENTS -->
        <!-- </q-page> -->
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MaintenanceTable from 'components/MaintenanceTable.vue'
import ProjectTable from 'components/PojectsTable.vue'

export default defineComponent({
  name: "MainLayout",

  components: {
    MaintenanceTable,ProjectTable,

  },
  setup() {
    return {
      drawer: ref(false)
    }
  },
  data() {
    return {
      showMaintenance: false,
      showProjects:false,
    }

  },
  methods: {
    toggleSection(section){
      this.showMaintenance = section === "mRequest";
      this.showProjects = section === "Projects";
    },

  }

});
</script>
