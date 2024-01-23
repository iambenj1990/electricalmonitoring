import { defineStore } from 'pinia';
import axios from 'axios';

export const useMaterialStore = defineStore('MaterialStore', {
  state: () => ({
    Materials:[],
    Material:[],
  }),

  actions: {
    async getMaterials(){
      try {
        const result = await axios.get('http://10.0.1.23:5000/api/materials/');
        this.Materials = result.data
       //console.log("Materials =>", result.data)

      } catch (error) {
        console.log(`Error fetching Request list : ${error}`)
      }
    },

    async getMaterial(val){
      try {
        const result = await axios.get(`http://10.0.1.23:5000/api/materials/${val}`);
        this.Material = result.data;
        console.log("Materials =>",result.data);
      } catch (error) {
        console.log(`Error fetching Request : ${error}`)
      }
    },

    async newMaterial(payload){
      try {
          const result = await axios.post('http://10.0.1.23:5000/api/materials', payload);
          console.log(result.statusText);
         // this.Material.push(result.data);
      } catch (error) {
        console.log(`Error! unable to save Request : ${error}`);
      }
    },

    async UpdateMaterial(id,payload){
      try {
         // '/requests/:id/update'
          const result = await axios.put(`http://10.0.1.23:5000/api/materials/`+ id, payload);
         // console.log('result====> ',result)
          // const cursor = this.JobOrder.findIndex((e) => e._id===payload._id);
          // if (cursor !== -1){
          //   this.JobOrder[cursor]= result.data;
          // }
          this.Material = result.data;

      } catch (error) {
        console.log(`Error! unable to Update Request : ${error}`);
      }
    },

    async removeMaterial(id){
      try {
         // '/requests/:id/update'
          const result = await axios.delete(`http://10.0.1.23:5000/api/materials/`+ id);
          console.log(result.statusText)
         // console.log('result====> ',result)
          // const cursor = this.JobOrder.findIndex((e) => e._id===payload._id);
          // if (cursor !== -1){
          //   this.JobOrder[cursor]= result.data;
          // }
      } catch (error) {
        console.log(`Error! unable to Update Request : ${error}`);
      }
    },



  },



});
