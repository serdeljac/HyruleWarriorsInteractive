<template>
  <div>
    <sidebar @newPageSelect="selectMapData"/>
    <main class="focus" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
      <router-view :mapDimensions="mapDimensions" :mapSelected="mapSelected" :mapInfo="mapInfo"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import sidebar from './components/sidebar.vue';
import fullDataJSON from '../assets/data/fulldata.json';

export default {
  name: "App Assembly",
  components: { sidebar },
  data() {
    return {
      sidebar_full: true,
      dimensions: {
        'adventure': [16, 8],
        'greatsea': [14, 7],
        'masterquest': [16, 8],
        'masterwindwaker': [14, 7],
        'twilight': [15, 8],
        'termina': [16, 8],
        'koholintisland': [14, 6],
        'grandtravels': [16, 8],
        'lorule': [16, 8],
        'rewards': [16, 8]
      },
      fulldata: this.sortDataJSON(fullDataJSON),
      mapDimensions: [],
      mapSelected: '',
      mapInfo: []
    }
  },
  created() {
    if (this.mapSelected === '') {
      this.$router.push('/');
    };
    
  },
  methods: {
    sortDataJSON(arr: any) {
      let legend = arr.filter((d: any) => d.mapname === 'legend');
      let adventure = arr.filter((d: any) => d.mapname === 'adventure');
      let greatsea = arr.filter((d: any) => d.mapname === 'greatsea');
      let masterquest = arr.filter((d: any) => d.mapname === 'masterquest');
      let masterwindwaker = arr.filter((d: any) => d.mapname === 'masterwindwaker');
      let twilight = arr.filter((d: any) => d.mapname === 'twilight');
      let termina = arr.filter((d: any) => d.mapname === 'termina');
      let koholintisland = arr.filter((d: any) => d.mapname === 'koholintisland');
      let grandtravels = arr.filter((d: any) => d.mapname === 'grandtravels');
      let lorule = arr.filter((d: any) => d.mapname === 'lorule');
      let rewards = arr.filter((d: any) => d.mapname === 'rewards');

      return {
        'legend': legend,
        'adventure': adventure,
        'greatsea': greatsea,
        'masterquest': masterquest,
        'masterwindwaker': masterwindwaker,
        'twilight': twilight,
        'termina': termina,
        'koholintisland': koholintisland,
        'grandtravels': grandtravels,
        'lorule': lorule,
        'rewards': rewards
      };
    },
    selectMapData(e: string) {
      this.mapDimensions = this.dimensions[e];
      this.mapSelected = e;
      this.mapInfo = this.fulldata[e];
    }
  },
}


</script>