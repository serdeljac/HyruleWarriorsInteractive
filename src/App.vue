<template>
  <div>

    <div class="sidebar" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">
      <div class="sidebar_logo">Hyrule Legends</div>
      <div class="sidebar_toggle">Switch/3DS</div>
      <div class="sidebar_toc"></div>
      <div class="sidebar_buycoffee"></div>
    </div>

    <main class="focus" :class="sidebar_full ? 'sidebar_full' : 'sidebar_mini'">

      <!-- CONTROL BAR (Based on section loaded) -->
      <div class="header">
        <!-- Map Select [Dropdown] -->
        <!-- Icon Filters [Dropdown] -->
        <!-- Show blockades [Checkbox] -->
        <!-- Show difficulties [Checkbox] -->
      </div>

      <!-- INTERACTIVE MAP LAYOUT 16x8 -->
      <div class="mapzone" :class="map_select">
        <div v-for="d in adventuremap" :key="d.mapcode" class="node">
          <div :class="d.mapcode">
            <div class="tile">
              <img :src="`../assets/mapimg/adventure/${d.mapcode}.jpg`" :alt="`${d.mapcode}`"/>
              <!-- <img :src="`../assets/mapimg/adventure/adv_h8.jpg`" :alt="`${d.mapcode}`"/> -->
            </div>
          </div>
        </div>
      </div>

      <div class="mapdetails">
        
      </div>

    </main>

    

  </div>
</template>

<script>
import adventuremapDATA from '../assets/data/adventuremap.json'
  export default {
    name: "App Assembly",
    data() {
      return {
        map_select: 'adventure',
        adventuremap: adventuremapDATA,
        sidebar_full: true,
      }
    },
  }
</script>