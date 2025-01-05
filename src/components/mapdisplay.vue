<template>
    <section class="mainbody">
        <div class="mapzone" :class="map_select">
            <div v-for="d in fullmapAppend" :key="d.mapcode" class="node">
                <div :class="d.mapcode" @click="loadTileData(d.mapcode)">
                    <div class="tile">
                        <img :src="`../assets/mapimg/adventure/${d.mapcode}.jpg`" :alt="`${d.mapcode}`"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import advDATA from '../../assets/data/adventuremap.json'

export default {
    name: "Map Display",
    data() {
        return {
            map_select: 'adventure',
            fullmapAppend: advDATA,
            tileData: ''
        }
    },
    methods: {
        loadTileData(mapcode: string) {
            this.$emit('loadTileData', mapcode)
        },
    }
}
</script>