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
        <p v-if="fullTileInfo.length == 0">No Data to show</p>
        <p v-else>{{fullTileInfo}} <br /> {{fullTileInfo.reward_victory}}</p>
        <p></p>
        
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
            let tileInfo = this.fullmapAppend.filter((d: any) => d.mapcode === tile)[0];
            const rewards = this.mapInfo.filter((d: any) => d.mapcode === tile);
            console.table(tileInfo)
            console.table(rewards)

            // Fetch A Rank Reward
            if (!tileInfo.reward_arank) {
                let arankVic = rewards.filter((d: any) => d.aquire === 'arank')[0];
                arankVic ? tileInfo.reward_arank = [arankVic.name, arankVic.character] : '';
            }

            //Fetch Victory Reward
            let victoryReward = rewards.filter((d: any) => d.aquire === 'victory')[0];
            let victoryReward2 = tileInfo.reward_victory;

            if (victoryReward | victoryReward2) {
                tileInfo.reward_victory = []
                tileInfo.reward_victory.push(victoryReward, victoryReward2)
            }

            //Fetch Heart Container (Treasure 1)
            //Fetch Heart Piece (Treasure 2)
            //Fetch Skulltula (if not, other treasure) (Treasure 3)
            //Fetch Skulltula (if not, fairy food) (Treasure 4)

            this.fullTileInfo = tileInfo

        }
    }
}

</script>
