<template>

<div class="q-pa-sm">
  <div class="q-pa-sm  " >
      <q-btn flat rounded color="primary" label="Add Project" icon="add" />
  </div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">PROJECT NAME / LOCATION / REFERENCE</th>
          <th class="text-right">MATERIAL COST</th>
          <th class="text-right">MATERIAL BALANCE</th>
          <th class="text-right">CONTINGENCY</th>
          <th class="text-right">TOTAL PROJECT COST</th>
          <th class="text-right">NO. DAYS</th>
          <th class="text-right">DATE STARTED</th>
          <th class="text-right">TARGET DATE ACCOMPLISHED</th>
          <th class="text-right">ACTIONS</th>

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
          <td class="text-center">3.9</td>
          <td class="text-center">327</td>
          <td class="text-center">
            <q-btn color="primary" icon="edit" />&nbsp;
            <q-btn color="red" icon="delete"  />
          </td>
        </tr>
        

      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({

})

</script>
