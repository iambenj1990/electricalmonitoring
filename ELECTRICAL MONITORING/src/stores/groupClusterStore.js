import { defineStore } from 'pinia';

export const useGroupClusterStore = defineStore('groupClusters', {
  id: 'choices',
  state: () => ({
    MainChoice: [
      'B1 - LSB',
      'B2 - BLDG MAINTENANCE',
      'B3 - CLEARING',
      'B4 - RAC MAINTENANCE',
      'B5 - COMMUNICATIONS/TELEPHON CABLE -RROW',
      "B6 - STREET LIGHTS",
      'B7 - OTHERS',
      ],
      SubChoice:[
              'B61 - CLUSTER 1',
              'B62 - CLUSTER 2'
                ]
     ,
      UnderSubChoice: {
        'B61 - CLUSTER 1':  ['B611 - METERED' , 'B612 - FLATRATE' , 'B613 - SOLAR'],
        'B62 - CLUSTER 2':  ['B621 - METERED' , 'B622 - FLATRATE' , 'B623 - SOLAR'],
      },
  }),
  getters: {

  },
  actions: {
    setSelectedChoice(choice) {
      this.selectedChoice = choice;
      this.selectedSubChoice = null; // Reset the selected sub-choice
    },
    setSelectedSubChoice(subChoice) {
      this.selectedSubChoice = subChoice;
    },
  },
});
