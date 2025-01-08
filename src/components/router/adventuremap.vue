<template>
    <section class="mapdisplay">
        <h1 class="mapdisplay_title">{{ mapSelected }} Map</h1>
        <div class="mapzone" :class="mapSelected" :style="getGridDimensions(mapDimensions)">
            <div v-for="d in fullmapAppend" :key="d.ID" class="node" :class="d.mapcode">
                <div class="tile" @click="getTileInfo(d.mapcode)">
                    <img :src="`../assets/mapimg/adventure/${d.mapcode}.jpg`" :alt="`${d.mapcode}`"/>
                </div>
            </div>
        </div>
        {{fullTileInfo}}
    </section>
</template>

<script lang="ts">
import adventureDATA from '../../../assets/data/adventuremap.json'

export default {
    name: "Map Display",
    data() {
        return {
            mapTileData: undefined,
            fullmapAppend: adventureDATA,
            fullTileInfo: []
        }
    },
    props: ['mapDimensions', 'mapSelected', 'mapInfo'],
    methods: {
        getGridDimensions(dim: any) {
            let setWidth = dim[0] * 80;
            return `grid-template-columns: repeat(${dim[0]}, 1fr); grid-template-rows: repeat(${dim[1]}, 1fr); width: ${setWidth}px;`;
        },
        getTileInfo(tile: string) {
            let tileData1 = this.fullmapAppend.filter((d: any) => d.mapcode === tile)[0];
            const tileData2 = this.mapInfo.filter((d: any) => d.mapcode === tile);

            if (!tileData1.reward_arank) {
                let arankVic = tileData2.filter((d: any) => d.aquire === 'arank')[0];
                arankVic ? tileData1.reward_arank = [arankVic.name, arankVic.character] : '';
            }
            
            this.fullTileInfo = tileData1

        }
    }
}

</script>