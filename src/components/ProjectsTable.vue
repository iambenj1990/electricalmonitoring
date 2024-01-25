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
      <q-card style="min-width: 800px">
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
                  v-model="ProjectData.MaterialCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Labor Cost"
                  v-model="ProjectData.LaborCost"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Contingency"
                  v-model="ProjectData.Contingency"
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Total Project Cost"
                  v-model="ProjectData.TotalProjectCost"
                />
              </div>
            </div>

            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="date"
                  label="Date Started"
                  v-model="ProjectData.DateStarted"
                />
              </div>
              <div class="col">
                <q-input
                  type="Date"
                  label="Target Date of Accomplishment"
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

            <!-- <div class="q-gutter-md row">
              <div class="col">
                <input
                  ref="fileInput"
                  type="file"
                  style="display: none"
                  @change="handleFileChange"
                />

                <q-input
                  v-model="uploadedFileName"
                  outlined
                  label="File Name"
                  readonly
                  @click="openFileInput"
                />
              </div>
            </div> -->
          </div>

          <q-card-actions align ="right">
            <!-- <div class="col">
              <q-btn
                icon="shopping_cart_checkout"
                color="green"
                label="Withdraw Materials"
                @click="newData_click()"
              />
            </div> -->
            <div class="col-mx q-gutter-md" >
              <q-btn color="red" label="Cancel" v-close-popup />
              <q-btn
                color="primary"
                label="Update"
                v-close-popup
                @click="save_image()"
              />
            </div>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!-- WITHDRAW MATERIALS -->

  <div>
    <q-dialog v-model="ViewMaterials" persistent>
      <q-card style="min-width: 1250px">
        <q-card-section>
          <div class="text-h6">
            <q-icon name="shopping_cart" size="md" /> Materials List
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-sm">
          <div class="q-pa-sm">
            <div class="q-gutter-md row">
              <div class="col">
                <q-input
                  type="text"
                  label="Project Name"
                  v-model="ProjectData.ProjectName"
                  readonly
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Reference No."
                  v-model="ProjectData.ReferenceNo"
                  readonly
                />
              </div>

              <div class="col">
                <q-input
                  type="text"
                  label="Total Project Cost"
                  v-model="ProjectData.TotalProjectCost"
                  readonly
                />
              </div>
              <div class="col">
                <q-input
                  type="text"
                  label="Material Balance"
                  v-model="ProjectData.MaterialBalance"
                  readonly
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="q-pa-xs">
            <q-btn
              flat
              rounded
              label="Withdraw"
              class="btnColor"
              icon="add"
              @click="ViewAvailMaterials = true"
            />
            <div class="q-gutter-md col">
              <div class="q-pa-sm">
                <q-table
                  :rows="rows"
                  :columns="Materialscolumns"
                  row-key="name"
                  :visible-columns="[
                    'MaterialName',
                    'MaterialDescriptions',
                    'MaterialQuantity',
                    'MaterialUnit',
                    'MaterialPrice',
                    'Actions',
                  ]"
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

  <div>
    <q-dialog v-model="ViewAvailMaterials" persistent>
      <q-card style="min-width: 50%; min-height: 50%">
        <q-card-section>
          <div class="text-h6">
            <q-icon name="shopping_cart" size="md" /> List of Available
            Materials
          </div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-sm"> </q-card-section>

        <q-card-section>
          <div class="q-pa-xs">
            <div class="q-gutter-md col">
              <div class="q-pa-sm">
                <q-table
                  :rows="storeMaterials.Materials"
                  :columns="MaterialAvailableColumns"
                  row-key="_id"
                  :filter="filterMaterials"
                  selection="multiple"
                  v-model:selected="selected"

                  >
                    <template v-slot:top-right>
                          <q-input
                            borderless
                            dense
                            debounce="300"
                            v-model="filterMaterials"
                            placeholder="Search"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                    </template>

        <!-- <template #body="props">
          <q-tr :props="props">

            <q-td key="MaterialName" style="font-size: 11px" align="center">
              {{ props.row.MaterialName }}
            </q-td>
            <q-td key="MaterialCost" style="font-size: 11px" align="center">
              {{ props.row.MaterialCost }}
            </q-td>
            <q-td key="MaterialUnit" style="font-size: 11px" align="center">
              {{props.row.MaterialUnit}}
            </q-td>

            <q-td key="Actions" align="center">
              <q-btn
                flat
                icon="add"
                color="primary"
                style="font-size: 1em"

              />

            </q-td>
          </q-tr>
        </template> -->

              </q-table>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section align="right">
          <!-- <q-btn color="red" label="Cancel" v-close-popup /> -->
          <q-btn color="red" label="Close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useProjectInfoStore } from "stores/projectStore.js";
import { usePhAddress } from "stores/TagumAddressStore.js";
import { useMaterialStore } from "stores/Materials.js";

export default {
  data() {
    return {

      filter: ref(""),
      filterMaterials:ref(""),
      uploadedFileName: "",
      newData: ref(false),
      viewData: ref(false),
      ViewMaterials: ref(false),
      ViewAvailMaterials: ref(false),

      //fetchAccDate:ref(new Date(Date.now)),
      //fetchStartDate: ref(new Date(Date.now)),
      City: ref("Tagum City"),
      brgy: [],
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
        MaterialsWithdrawn: [
          {
            MaterialName: "",
            Description: "",
            Quantity: "",
            Unit: "",
            Price: "",
          },
        ],
        ProjectIncharge: "",
        Status: "",
        Remarks: "",
        IsDeleted: false,
      },
      StatusSelections: ["Recieved", "On-going", "Finished"],
      MaterialAvailableColumns: [
        // {
        //   name: "_id",
        //   label: "id",
        //   field: "_id",
        //   sortable: true,
        //   align: "center",
        //   headerClasses: "bg-grey-7 text-white",
        //   headerStyle: "font-size: 1.2 em",
        // },
        {
          name: "MaterialName",
          label: "Material Name",
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
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialUnit",
          label: "Unit",
          field: "MaterialUnit",
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },

      ],

      Materialscolumns: [
        {
          name: "ID",
          label: "ID",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialName",
          label: "Material Name",
          //  field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialDescriptions",
          label: "Descriptions",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialQuantity",
          label: "Quantity",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialUnit",
          label: "Unit",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "MaterialPrice",
          label: "Price",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Actions",
          label: "Actions",
          //field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
      ],

      columns: [
        {
          name: "Withdrawals",
          label: "Withdrawals",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ID",
          label: "ID",
          field: "_id",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ProjectName",
          label: "Project Name",
          field: "ProjectName",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ReferenceNo",
          label: "Reference No",
          field: "ReferenceNo",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "TotalProjectCost",
          label: "Total Project Cost",
          field: "TotalProjectCost",
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "ProjectIncharge",
          label: "Project In-charge",
          field: "ProjectIncharge",
          sortable: true,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "TargetAccomplishment",
          label: "Target Accomplishment",
          field: "TargetAccomplishment",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
          align: "center",
        },
        {
          name: "Location",
          label: "Location",
          field: (row) => row.Location.Barangay,
          align: "center",
          headerClasses: "bg-grey-7 text-white",
          headerStyle: "font-size: 1.2 em",
        },
        {
          name: "Status",
          label: "Status",
          headerClasses: "bg-grey-7 text-white",
          align: "center",
          headerStyle: "font-size: 1.2 em",
          field: "Status",
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
    const storeMaterials = useMaterialStore();
    const Brgystore = usePhAddress();
    storeMaterials.getMaterials();
    StoreElectricalProject.getProjects();
    console.log("Project Data list ==> ", StoreElectricalProject.Projects);
    const selected = ref([]);

    return {
      StoreElectricalProject,
      Brgystore,
      storeMaterials,
      selected,

    };
  },

  methods: {
    save_image() {
      const fs = require("fs");
      const path = require("path");
      // Replace 'sourceImagePath' and 'destinationFolderPath' with your actual file paths
      const sourceImagePath = this.uploadedFileName;
      const destinationFolderPath =
        "Q:/Engineering/server/public/uploads/equipments/";

      // Extract the file name from the source image path
      const fileName = path.basename(sourceImagePath);

      // Construct the destination path by combining the destination folder and file name
      const destinationPath = path.join(destinationFolderPath, fileName);

      // Copy the image file
      fs.copyFile(sourceImagePath, destinationPath, (err) => {
        if (err) {
          console.error("Error copying image:", err);
        } else {
          console.log("Image copied successfully!");
        }
      });
    },

    openFileInput() {
      // Trigger a click event on the hidden file input
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      // Update the file name when a file is selected
      this.uploadedFileName = fileInput.value;
      console.log("filename=>", this.uploadedFileName);
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

    clearData() {
      this.ProjectData.ProjectName = "";
      this.ProjectData.ProjectIncharge = "";
      this.ProjectData.Location.Barangay = "";
      this.ProjectData.ReferenceNo = "";
      this.ProjectData.MaterialCost = "";
      this.ProjectData.MaterialBalance = "";
      this.ProjectData.LaborCost = "";
      this.ProjectData.LaborBalance = "";
      this.ProjectData.Contingency = "";
      this.ProjectData.TotalProjectCost = "";
      this.ProjectData.NoOfDays = "";
      this.ProjectData.DateStarted = "";
      this.ProjectData.TargetAccomplishment = "";
      this.ProjectData.AccomplishmentPctg = "";
      this.ProjectData.ProjectIncharge = "";
      this.ProjectData.Status = "";
      this.ProjectData.IsDeleted = "";
      this.ProjectData.Remarks = "";
    },

    calculateTotalProjectCost() {
      this.ProjectData.TotalProjectCost =
        this.ProjectData.MaterialCost +
        this.ProjectData.LaborCost +
        this.ProjectData.Contingency;
      return this.formatMoney(projectCost);
    },

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
      //return `${month}/${day}/${year}`;
      return `${year}-${month}-${day}`;
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
      // console.log("before to save ==> ", this.ProjectData);
      await store.newProject(this.ProjectData).then((res) => {
        this.StoreElectricalProject.getProjects();
        this.newData == false;
      });
    },

    async ViewProject(id, btnclick) {
      this.clearEmptyValues(this.ProjectData);
      const storeProject = useProjectInfoStore();
      await storeProject.getProject(id).then(() => {
        this.ProjectData = storeProject.Project;
        this.ProjectData.TargetAccomplishment = this.formatDate(
          new Date(this.ProjectData.TargetAccomplishment)
        );
        this.ProjectData.DateStarted = this.formatDate(
          new Date(this.ProjectData.DateStarted)
        );

        this.ProjectData.MaterialCost = this.formatMoney(
          this.ProjectData.MaterialCost
        );
        this.ProjectData.TotalProjectCost = this.formatMoney(
          this.ProjectData.TotalProjectCost
        );
        this.ProjectData.LaborCost = this.formatMoney(
          this.ProjectData.LaborCost
        );
        this.ProjectData.Contingency = this.formatMoney(
          this.ProjectData.Contingency
        );
        //console.log("fetched data ==>", this.ProjectData);

        switch (btnclick) {
          case "View Project":
            this.viewData = true;
            break;

          case "View Materials":
            this.ViewMaterials = true;
            break;

          case "View Available Materials":
            this.ViewAvailMaterials = true;
            break;
        }
      });
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

.btnColor {
  color: seagreen;
}
</style>
