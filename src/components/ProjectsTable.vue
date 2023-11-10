<template>
  <div class="q-pa-sm">
    <div class="q-pa-sm">
      <q-btn
        flat
        rounded
        color="primary"
        label="Add Project"
        icon="add"
        @click="newData = true"
      />
    </div>
    <div>
      <q-table
        title="Electrical Projects List"
        :rows="StoreElectricalProject.Projects"
        :columns="columns"
        row-key="_id"
        :visible-columns="[
          'ProjectName',
          'ReferenceNo',
          'TotalProjectCost',
          'ProjectIncharge',
          'TargetAccomplishment',
          'Location',
          'Actions',
        ]"
      >
        <template #body="props">
          <q-tr :props="props">
            <q-td key="ProjectName" style="font-size: 11px">
              {{ props.row.ProjectName }}
            </q-td>
            <q-td key="ReferenceNo" style="font-size: 11px">
              {{ props.row.ReferenceNo }}
            </q-td>
            <q-td key="TotalProjectCost" style="font-size: 11px" align="center">
              {{ formatMoney(props.row.TotalProjectCost) }}
            </q-td>
            <q-td key="ProjectIncharge" style="font-size: 11px">
              {{ props.row.ProjectIncharge }}
            </q-td>
            <q-td key="TargetAccomplishment" style="font-size: 11px">
              {{ formatDate(props.row.TargetAccomplishment) }}
            </q-td>
            <q-td key="Barangay" style="font-size: 11px">
              {{ props.row.Location.Barangay }}
            </q-td>

            <q-td key="Actions" align="center">
              <q-btn
                flat
                icon="edit"
                color="primary"
                style="font-size: 1em"
                @click="ViewProject(props.row._id)"
              >
              </q-btn>
              <q-btn
                flat
                icon="delete"
                color="negative"
                style="font-size: 1em"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>

  <!-- NEW PROJECT INPUT -->
  <div>
    <q-dialog v-model="newData" persistent>
      <q-card style="min-width: 1250px">
        <q-card-section>
          <div class="text-h6">Electrical Project Information</div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="q-pa-xs">
            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.ProjectName"
                  label="Project Name"
                />
              </div>

              <div class="col-md-6">
                <q-input
                  v-model="ProjectData.ReferenceNo"
                  label="Reference No."
                  type="text"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="text"
                  label="Material Cost"
                  prefix="₱"
                  v-model="ProjectData.MaterialCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Labor Cost"
                  prefix="₱"
                  v-model="ProjectData.LaborCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Contingency"
                  prefix="₱"
                  v-model="ProjectData.Contingency"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Total Project Cost"
                  prefix="₱"
                  v-model="ProjectData.TotalProjectCost"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="Date"
                  label="Date Started"
                  inputmode="date"
                  v-model="ProjectData.DateStarted"
                />
              </div>
              <div class="col">
                <q-input
                  type="Date"
                  label="Target Date of Accomplishment"
                  inputmode="date"
                  v-model="ProjectData.TargetAccomplishment"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-select
                  v-model="ProjectData.Location.Barangay"
                  :options="Brgystore.barangay"
                  label="Location"
                />
              </div>

              <div class="col">
                <q-input label="City" v-model="City" readonly />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.ProjectIncharge"
                  label="Project In-Charge"
                  type="text"
                />
              </div>
              <div class="col"></div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.Remarks"
                  label="Remarks"
                  type="textarea"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="red" label="Cancel" v-close-popup />
          <q-btn
            color="primary"
            label="Save"
            v-close-popup
            @click="InsertNewProject()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <!-- UPDATE PROJECT  -->
  <div>
    <q-dialog v-model="viewData" persistent>
      <q-card style="min-width: 1250px">
        <q-card-section>
          <div class="text-h6">Electrical Project Information</div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <div class="q-pa-xs">
            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.ProjectName"
                  label="Project Name"
                />
              </div>

              <div class="col-md-6">
                <q-input
                  v-model="ProjectData.ReferenceNo"
                  label="Reference No."
                  type="text"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="text"
                  label="Material Cost"
                  prefix="₱"
                  v-model="ProjectData.MaterialCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Labor Cost"
                  prefix="₱"
                  v-model="ProjectData.LaborCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Contingency"
                  prefix="₱"
                  v-model="ProjectData.Contingency"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Total Project Cost"
                  prefix="₱"
                  v-model="ProjectData.TotalProjectCost"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="Date"
                  label="Date Started"
                  inputmode="date"
                  v-model="ProjectData.DateStarted"
                />
              </div>
              <div class="col">
                <q-input
                  type="Date"
                  label="Target Date of Accomplishment"
                  inputmode="date"
                  v-model="ProjectData.TargetAccomplishment"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-select
                  v-model="brgy"
                  :options="Brgystore.barangay"
                  label="Location"
                />
              </div>

              <div class="col">
                <q-input label="City" v-model="City" readonly />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.ProjectIncharge"
                  label="Project In-Charge"
                  type="text"
                />
              </div>
              <div class="col"></div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  v-model="ProjectData.Remarks"
                  label="Remarks"
                  type="textarea"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="red" label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useProjectInfoStore } from "stores/projectStore.js";
import { usePhAddress } from "stores/TagumAddressStore.js";

export default {
  data() {
    return {
      newData: ref(false),
      viewData: ref(false),
      City: ref("Tagum City"),
      brgy:[],
      ProjectData: {
        ProjectName: "",
        Location: {
          //0: {
            Barangay: "",
            Street: "",
          //},
        },
        ReferenceNo: "",
        MaterialCost: "",
        MaterialBalance: "",
        LaborCost: "",
        LaborBalance: "",
        Contingency: "",
        TotalProjectCost: "",
        NoOfDays: "",
        TargetAccomplishment: "",
        DateStarted: "",
        AccomplishmentPctg: "",
        ProjectIncharge: "",
        Status: "",
        Remarks: "",
        IsDeleted: false,
      },
      StatusSelections: ["Recieved", "On-going", "Finished"],

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
          name: "ProjectName",
          label: "Project Name",
          field: "ProjectName",
          sortable: true,
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ReferenceNo",
          label: "Reference No",
          field: "ReferenceNo",
          sortable: true,
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "TotalProjectCost",
          label: "Total Project Cost",
          field: "TotalProjectCost",
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ProjectIncharge",
          label: "Project In-charge",
          field: "ProjectIncharge",
          sortable: true,
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "TargetAccomplishment",
          label: "Target Accomplishment",
          field: "TargetAccomplishment",
          align: "left",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Location",
          label: "Location",
          field: (row) => row.Location.Barangay,
          align: "left",
          headerClasses: "bg-grey-7 text-white",
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
    };
  },

  setup() {
    const StoreElectricalProject = useProjectInfoStore();
    const Brgystore = usePhAddress();

    StoreElectricalProject.getProjects();
    console.log("Project Data list ==> ", StoreElectricalProject.Projects);

    return {
      StoreElectricalProject,
      Brgystore,
    };
  },

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
    },

    formatDate(value) {
      if (!value) return "";
      const date = new Date(value);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${month}-${day}-${year}`;
    },

    formatMoney(value) {
      if (!value) return "0.00";
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value);
    },

    async InsertNewProject() {
      this.ProjectData.IsDeleted = false;
      this.ProjectData.Status = "On-going";

      const store = useProjectInfoStore();
      //console.log('data to save ==>', this.ProjectData)
      await store.newProject(this.ProjectData).then((res) => {
        this.StoreElectricalProject.getProjects();
        this.newData == false;
      });
    },

    async ViewProject(id) {
      const storeProject = useProjectInfoStore();
      await storeProject.getProject(id).then((res) => {
        this.ProjectData = storeProject.Project;
        console.log("fetched data ==>", this.ProjectData);
        //console.log("fetched data ==>", this.ProjectData.Location.Barangay);
       this.viewData = true;
      });
    },
  },
};
</script>
