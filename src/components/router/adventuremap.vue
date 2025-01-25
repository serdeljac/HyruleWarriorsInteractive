<template>
    <section class="mapdisplay">
        
        <h1 class="mapdisplay_title">{{ mapData.mapname }} Map</h1>

        <div class="mapdisplay_filter">
            <p @click="changeFilter('card')">Card</p>
            <p @click="changeFilter('difficulty')">Difficulty</p>
            <p @click="changeFilter('heart')">Heart</p>
            <p @click="changeFilter('skulltula')">Skulltula</p>
            <p @click="changeFilter('weapon')">Weapon</p>
            <p @click="changeFilter('character')">Character</p>
            <p @click="changeFilter('costume')">Costume</p>
            <p @click="changeFilter('fairy')">Fairy</p>
            <p @click="changeFilter('salon')">Salon</p>
            <p @click="changeFilter('food')">Food</p>
        </div>

        <div class="mapzone" :class="mapData.mapname" :style="getGridDimensions(mapData.dimensions)">
            <div v-for="d in mapData.tileData" :key="d.ID" class="node" :class="`${d.mapcode}`" @click="fetchTileData(d)">
                <div class="wrapper" :style="`background-image:url(../assets/mapimg/${mapData.mapname}/${d.mapcode}.webp)`">

                    <div class="tile" v-if="filter.difficulty" :class="`diff-style diff-${d.difficulty}`"></div>

                    <div class="tile" v-if="filter.heart" :class="`heart-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'heartcontainer')" :src="`../assets/icons/heartcontainer.png`" />
                        <img v-if="checkFilterAppend(d.mapcode, 'heartpiece')" :src="`../assets/icons/heartpiece.png`" />
                    </div>

                    <div class="tile" v-if="filter.weapon" :class="`weapon-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'weapon')" :src="`../assets/icons/weapon.png`" />
                    </div>

                    <div class="tile" v-if="filter.skulltula" :class="`skulltula-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'skulltula')" :src="`../assets/icons/skulltula.png`" />
                        <img v-if="checkFilterAppend(d.mapcode, 'skulltula')" :src="`../assets/icons/skulltula.png`" />
                    </div>

                    <div class="tile" v-if="filter.fairy" :class="`fairy-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'fairy')" :src="`../assets/icons/fairy.png`" />
                    </div>

                    <div class="tile" v-if="filter.salon" :class="`salon-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'salon')" :src="`../assets/icons/fairy_salon.png`" />
                    </div>

                    <div class="tile" v-if="filter.character" :class="`character-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'character')" :src="`../assets/icons/character.png`" />
                    </div>

                    <div class="tile" v-if="filter.food" :class="`food-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'food')" :src="`../assets/icons/fairy_food.png`" />
                    </div>

                    <div class="tile" v-if="filter.costume" :class="`costume-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'costume')" :src="`../assets/icons/costume.png`" />
                    </div>

                    <div class="tile" v-if="filter.card" :class="`card-style`">
                        <img v-if="checkFilterAppend(d.mapcode, 'card')" :src="`../assets/icons/${checkCard(d.mapcode)}.jpg`" />
                    </div>

                </div>
            </div>
        </div>

        <div class="difficulty_legend" v-if="filter.difficulty">

            <div  class="difficulty_legend-modes">
                <p class="difficulty_legend-subheader">Map Level</p>
                <p class="difficulty_legend-content">{{ `Levels ${mapData.levelRange} Recommended` }}</p>
            </div>

            <div class="difficulty_legend-modes">
                <p class="difficulty_legend-subheader">Difficulty Zones [Easy to Hard]</p>
                <div class="difficulty_legend-content">
                    <p>BLACK</p> ➨
                    <p>GREEN</p> ➨
                    <p>YELLOW</p> ➨
                    <p>PURPLE</p> ➨
                    <p>ORANGE</p> ➨
                    <p>BLUE</p> ➨
                    <p>RED</p>
                </div>
            </div>
        </div>

        <mapdetails :tileData="tileData" v-if="tileData" />

    </section>
</template>

<script lang="ts">
import mapdetails from '../parts/mapdetails.vue'

export default {
    name: "Map Display",
    props: ['mapData'],
    data() {
        return {
            filter: {
                'heart': false,
                'weapon': false,
                'skulltula': false,
                'fairy': false,
                'salon': false,
                'character': false,
                'food': false,
                'costume': false,
                'difficulty': false,
                'card': false
            },
            tileData: ''
        }
    },
    components: { mapdetails },
    methods: {
        getGridDimensions(dim: any) {
            let setWidth = dim[0] * 80;
            return `grid-template-columns: repeat(${dim[0]}, 1fr); grid-template-rows: repeat(${dim[1]}, 1fr); width: ${setWidth}px;`;
        },
        checkFilterAppend(mapcode: string, type: string) {
            let results = this.mapData.treasureData.filter((d: any) => d.mapcode == mapcode);
            for (let i=0; i < results.length; i++) {
                if (results[i].identity == type) {
                    return true
                }
            }
            return false
        },
        checkCard(mapcode: string) {
            let results = this.mapData.treasureData.filter((d: any) => d.mapcode == mapcode && d.identity == 'card')
            return results[0].character
        },
        changeFilter(name: string) {
            if (this.filter[name]) {
                this.filter[name] = false
                return false;
            }

            this.filter = {
                'heart': false,
                'weapon': false,
                'skulltula': false,
                'fairy': false,
                'salon': false,
                'character': false,
                'food': false,
                'costume': false,
                'difficulty': false,
                'card': false
            };

            this.filter[name] = true
        },
        fetchTileData(arr: any) {
            let compiledTileData = arr
            compiledTileData.search = compiledTileData.search === 'FALSE' ? false : true
            compiledTileData.reward_arank = this.mapData.treasureData.filter((d: any) => d.mapcode == arr.mapcode && d.aquire == 'arank')
            compiledTileData.reward_victory = this.mapData.treasureData.filter((d: any) => d.mapcode == arr.mapcode && d.aquire == 'victory')
            compiledTileData.treasure = this.mapData.treasureData.filter((d: any) => d.mapcode == arr.mapcode && d.aquire == 'treasure')
            this.tileData = compiledTileData
        },
    }
}

</script>
