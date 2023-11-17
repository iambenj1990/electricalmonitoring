import { defineStore } from 'pinia';
import axios from 'axios';

export const useProjectInfoStore = defineStore('ProjectInfoStore', {
  state: () => ({
    Projects:[],
    Project:[],
  }),

  actions: {
    async getProjects(){
      try {
        const result = await axios.get('http://10.0.1.23:5000/api/eprojects/');
        this.Projects = result.data;
       console.log("JobOrders=",this.Projects)

      } catch (error) {
        console.log(`Error fetching Request list : ${error}`)
      }
    },

    async getProject(val){
      try {
        const result = await axios.get(`http://10.0.1.23:5000/api/eprojects/${val}`);
        this.Project = result.data;
        console.log("data=>",result.data);
      } catch (error) {
        console.log(`Error fetching Request : ${error}`)
      }
    },

    async newProject(payload){
      try {
          const result = await axios.post('http://10.0.1.23:5000/api/eprojects/newprojects', payload);
          this.Project.push(result.data);
      } catch (error) {
        console.log(`Error! unable to save Request : ${error}`);
      }
    },

    async UpdateProjects(id,payload){
      try {
         // '/requests/:id/update'
          const result = await axios.put(`http://10.0.1.23:5000/api/eprojects/update/`+ id, payload);
         // console.log('result====> ',result)
          // const cursor = this.JobOrder.findIndex((e) => e._id===payload._id);
          // if (cursor !== -1){
          //   this.JobOrder[cursor]= result.data;
          // }
          this.Project = result.data;

      } catch (error) {
        console.log(`Error! unable to Update Request : ${error}`);
      }
    },


  },



});
