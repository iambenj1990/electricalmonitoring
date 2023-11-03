import { defineStore } from 'pinia';
import axios from 'axios';

export const useGroupingClusterStore = defineStore('GroupingClusterStore', {


  state: () => ({
   Groups:[],

  }),


  actions:{


    async fetchGroup(){
      try {
        const result = await axios.get("http://10.0.1.23:5000/api/groupsApi/");
        this.Groups= result.data;
        //this.SubGroupName = this.Groups.SubGroup.SubGroupName;

        //console.log("groups=",this.Groups)

        //this.groupNames = this.groups.map(item => item.groupNames)
         }
         catch (error) {
          console.log(`error fetchig task ${error}`);
         }
    },
  }



});
