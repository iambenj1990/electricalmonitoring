import { defineStore } from 'pinia';
import axios from 'axios';

export const useJobOrdersInfoStore = defineStore('JobOrdersInfoStore', {
  state: () => ({
    JobOrders:[],
    JobOrder:{},
  }),

  actions: {
    async getJobOrders(){
      try {
        const result = await axios.get('http://10.0.1.23:5000/api/requests');
        this.JobOrders = result.data;
      //  console.log("JobOrders=",this.JobOrders)
      } catch (error) {
        console.log(`Error fetching Request list : ${error}`)
      }
    },

    async getJobOrder(val){
      try {
        const result = await axios.get(`http://10.0.1.23:5000/api/requests/${val}`);
        this.JobOrder = result.data;
      } catch (error) {
        console.log(`Error fetching Request : ${error}`)
      }
    },

    async newJobOrder(payload){
      try {
          const result = await axios.post('http://10.0.1.23:5000/api/requests/new', payload);
          this.JobOrders.push(result.data);
      } catch (error) {
        console.log(`Error! unable to save Request : ${error}`);
      }
    },

    async UpdateJobOrder(id,payload){
      try {
         // '/requests/:id/update'
          const result = await axios.put(`http://10.0.1.23:5000/api/requests/update/`+ id, payload);
         // console.log('result====> ',result)
          // const cursor = this.JobOrder.findIndex((e) => e._id===payload._id);
          // if (cursor !== -1){
          //   this.JobOrder[cursor]= result.data;
          // }
          this.JobOrder = result.data;

      } catch (error) {
        console.log(`Error! unable to Update Request : ${error}`);
      }
    },


  },



});
