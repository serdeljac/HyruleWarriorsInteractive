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

        <ul v-if="fullTileInfo">
            {{ fullTileInfo }}
        </ul>
        
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
            fullTileInfo: '',
        }
    },
    props: ['mapDimensions', 'mapSelected', 'mapInfo'],
    created() {
        for (let i = 0; i < this.fullmapAppend.length; i++) {
            let mapcode = this.fullmapAppend[i].mapcode
            let tileRewards = this.mapInfo.filter((d: any) => d.mapcode === mapcode)

            let filterVariables = {
                'heartcontain': this.checkFilter('heartcontainer', tileRewards),
                'heartpiece': this.checkFilter('heartpiece', tileRewards),
                'weapon': this.checkFilter('weapon', tileRewards),
                'skulltula': this.checkFilter('skulltula', tileRewards),
                'fairy': this.checkFilter('fairy', tileRewards),
                'salon': this.checkFilter('salon', tileRewards),
                'character': this.checkFilter('character', tileRewards),
                'food': this.checkFilter('food', tileRewards),
                'costume': this.checkFilter('costume', tileRewards),
            }
            this.fullmapAppend[i].filter = filterVariables
            this.fullmapAppend[i].reward_arank = this.appendRewards('arank', tileRewards, this.fullmapAppend[i].reward_arank)

            console.table(this.fullmapAppend[i])
        }
    },
    methods: {
        getGridDimensions(dim: any) {
            let setWidth = dim[0] * 80;
            return `grid-template-columns: repeat(${dim[0]}, 1fr); grid-template-rows: repeat(${dim[1]}, 1fr); width: ${setWidth}px;`;
        },
        checkFilter(condition: string, arr: []) {
            let results = arr.filter((d: any) => d.identity === condition);
            return results.length > 0 ? true : false
        },
        appendRewards(type: string, arr: [], defaultReward: string) {

            let results = arr.filter((d: any) => d.aquire === type);
            let reward_init = [defaultReward, '']
        },
        getTileInfo(tile: string) {
            let tileInfo = this.fullmapAppend.filter((d: any) => d.mapcode === tile)[0];
            this.fullTileInfo = tileInfo
        }
    }
}

</script>
