<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-pa-md">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CEO - Electrical Division Project & Maintenance Monitoring System </q-toolbar-title>

         <q-btn flat icon="logout" size="md" style="color: white;" label="Logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-item clickable v-ripple>
            <q-icon name="dashboard" size="24px" class="q-mr-md" /> Dashboard
          </q-item>
          <q-expansion-item label="Management" expand-separator icon="receipt">
            <q-item clickable v-ripple @click="toggleSection('ElMaintenance')">
              <q-item-section class="q-ml-sm">
                <!-- Icon added here -->
                <q-item-label>
                  <q-icon name="electrical_services" class="q-ml-md q-mr-md" />
                  Electrical Maintenance</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="toggleSection('Project')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    name="format_list_bulleted"
                    class="q-ml-md q-mr-md"
                  />Electrical Projects</q-item-label
                >
              </q-item-section>
            </q-item>
             <q-item clickable v-ripple @click="toggleSection('GoodItems')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon
                    name="computer"
                    class="q-ml-md q-mr-md"
                  />Upload Items
                  </q-item-label
                >
              </q-item-section>
            </q-item>
            <!-- <q-item clickable v-ripple @click="toggleSection('project')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="work" class="q-ml-md q-mr-md" />
                  Project</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item label="Settings" expand-separator icon="settings">
            <q-item clickable v-ripple @click="toggleSection('user')">
              <q-item-section class="q-ml-sm">
                <q-item-label>
                  <q-icon name="people" class="q-ml-md q-mr-md" />
                  User</q-item-label
                >
              </q-item-section>
            </q-item> -->
      </q-expansion-item>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Engineering</div>
          <div>@citygovernmentoftagum</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container v-if="showMaintenance">
      <!-- <router-view /> -->
      <Maintenance />
    </q-page-container>
    <q-page-container v-if="showProjects">
      <Projects />
    </q-page-container>
     <q-page-container v-if="showGoodItems">
      <GoodItems />
    </q-page-container>
    <!--<q-page-container v-if="showProject">
      <ProjectTable />
    </q-page-container>
    <q-page-container v-if="showUser">
      <UserTable />
    </q-page-container> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
// import EssentialLink from "components/EssentialLink.vue";
import Maintenance from "components/MaintenanceTable.vue";
import Projects from "components/ProjectsTable.vue";
import GoodItems from "components/UploadItem.vue";




export default defineComponent({
  components: {
    // EssentialLink,
    Maintenance,
    Projects,
    GoodItems,

  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
    //  essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      submenuOpen: false,
      showMaintenance: false,
      showProjects: false,
      showGoodItems: false,
    };
  },
  methods: {
    toggleSubMenu() {
      this.submenuOpen = !this.submenuOpen;
    },

    closeSubMenu() {
      this.submenuOpen = false;
    },
    toggleSection(section) {
      this.showMaintenance = section === "ElMaintenance";
      this.showProjects = section === "Project";
      this.showGoodItems = section === "GoodItems";
      // this.showMachine = section === "machine";

      // this.showUser = section === "user";
    },
  },
});
</script>
