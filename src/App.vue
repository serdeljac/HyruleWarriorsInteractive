<template>
  <div>
    <sidebar @newPageSelect="selectMapData"/>
    <main class="focus" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
      <router-view :mapData="adventuremode"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import sidebar from './components/sidebar.vue';

import tiledataJSON from '../assets/data/tiledata.json'
import treasureJSON from '../assets/data/treasures.json';

export default {
  name: "App Assembly",
  components: { sidebar },
  data() {
    return {
      sidebar_full: true,

      //Fetch JSON Data
      fullTileData: this.sortData(tiledataJSON),
      fullTreasureData: this.sortData(treasureJSON),

      //Each map Dimensions
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

      //Each map Level Range
      levelRange: {
        'adventure': '1-30',
        'greatsea': '1-30',
        'masterquest': '',
        'masterwindwaker': '',
        'twilight': '',
        'termina': '',
        'koholintisland': '',
        'grandtravels': '',
        'lorule': '',
        'rewards': ''
      },

      //Prop data for adventure mode pages
      adventuremode: {
        mapname: '',
        levelRange: '',
        dimensions: [],
        tileData: [],
        treasureData: []
      },

      //Prop data for item list pages
      itemList: []

    }
  },
  created() {
    //Load Home Page on every refresh
    if (this.adventuremode.mapname === '') {this.$router.push('/');};
  },
  methods: {
    sortData(arr: any) {
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
      e == 'home' ? this.$router.push('/') : this.$router.push(`/${e}map`);
      this.adventuremode.mapname = e
      this.adventuremode.levelRange = this.levelRange[e]
      this.adventuremode.dimensions = this.dimensions[e]
      this.adventuremode.tileData = this.fullTileData[e]
      this.adventuremode.treasureData = this.fullTreasureData[e]
    }
  },
}


</script>