<template>
    <div class="mapdetails">
        <div class="mapdetails_gridblock mapimg">
            <div class="toggle">
                <div class="tab" :class="search_image ? 'active' : ''" @click="search_image = true">SEARCH</div>
                <div class="tab" :class="!search_image ? 'active' : ''" @click="search_image = false">Locations</div>
            </div>
            <div class="mapimg_select">
                <div v-if="search_image" class="img" :style="`background-image:url(../../assets/mapimg/${mapSelected}/unlocks/${fullTileInfo.mapcode}_unlock.webp)`">
                    <ul v-if="!fullTileInfo.search"><li>Nothing to search</li></ul>
                </div>
                <div v-else>
                    <ul>
                        <li v-for="d in fullTileInfo.treasure" :key="d.ID">{{ displayLocations(d) }}</li>
                        <li v-if="fullTileInfo.type == 'key'">{{ `Key Location: ${fullTileInfo.notes}` }}</li>
                        <li v-if="fullTileInfo.type == 'quiz'">{{ `Defeat Order: ${fullTileInfo.notes}` }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mapdetails_gridblock mission">
            <h2>{{ `[${fixMapCode(fullTileInfo.mapcode)}] ${fullTileInfo.mission} - ${fullTileInfo.difficulty}` }}</h2>
        </div>

        <div class="mapdetails_gridblock arank">
            <h3>A Rank Reward</h3>
            <div class="rewarditem" v-for="d in fullTileInfo.reward_arank" :key="d.ID">

                <div class="rewarditem_wrapper" v-if="d.identity == 'heartcontainer' || d.identity == 'heartpiece'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ d.character }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'material'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} Material` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'weapon'">
                    <div class="weapon_wrapper">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ d.level }}</p>
                    </div>
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else>
                    <p>{{ d }}</p>
                </div>

            </div>
        </div>

        <div class="mapdetails_gridblock victory">
            <h3>Victory Reward</h3>
            <div class="rewarditem" v-for="d in fullTileInfo.reward_victory" :key="d.ID">

                <div class="rewarditem_wrapper" v-if="d.identity == 'heartcontainer' || d.identity == 'heartpiece'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ d.character }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'material'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} Material` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'weapon'">
                    <div class="weapon_wrapper">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ d.level }}</p>
                    </div>
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'card'">
                    <img class="iconimg" :src="`../../assets/icons/${d.character}.jpg`" />
                    <p>{{ `${d.name} Card` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'character'">
                    <p>{{ `Unlock [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else-if="d.identity == 'costume'">
                    <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                    <p>{{ `${d.name} [${d.character}]` }}</p>
                </div>

                <div class="rewarditem_wrapper" v-else>
                    <p>{{ d }}</p>
                </div>

            </div>
        </div>

        <div class="mapdetails_gridblock treasure">
            <h3>Treasures</h3>
            <div class="inline">
                <div class="rewarditem" v-for="d in fullTileInfo.treasure" :key="d.ID">

                    <div class="rewarditem_wrapper" v-if="d.identity == 'heartcontainer' || d.identity == 'heartpiece'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ d.character }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'weapon'">
                        <div class="weapon_wrapper">
                            <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                            <p>{{ d.level }}</p>
                        </div>
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'costume'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'fairy'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'salon'">
                        <img class="iconimg" :src="`../../assets/icons/fairy_${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'food'">
                        <img class="iconimg" :src="`../../assets/icons/fairy_${d.identity}.png`" />
                        <p>{{ `${d.name} [${d.character}]` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else-if="d.identity == 'skulltula'">
                        <img class="iconimg" :src="`../../assets/icons/${d.identity}.png`" />
                        <p>{{ `${d.name} #${d.no}` }}</p>
                    </div>

                    <div class="rewarditem_wrapper" v-else>
                        <p>{{ d }}</p>
                    </div>

                </div>
            </div>
        </div>

        <div class="mapdetails_gridblock conditions">
            <div class="inline">
                <div class="subblock">
                    <h3>A Rank KO</h3>
                    <p v-if="fullTileInfo.arank_ko">{{ fullTileInfo.arank_ko }}</p>
                    <p v-else>-</p>
                </div>

                <div class="subblock">
                    <h3>A Rank Time</h3>
                    <p v-if="fullTileInfo.arank_time">{{ `${fullTileInfo.arank_time} Minutes` }}</p>
                    <p v-else>-</p>
                </div>

                <div class="subblock">
                    <h3>A Rank Damage</h3>
                    <p v-if="fullTileInfo.arank_damage">{{ fullTileInfo.arank_damage }}</p>
                    <p v-else>-</p>
                </div>
                <div class="subblock">
                    <h3>Skulltula Conditions</h3>
                    <p>{{ fetchSkulltulaCondition(1, fullTileInfo.treasure) }}</p>
                    <p>{{ fetchSkulltulaCondition(2, fullTileInfo.treasure) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Map Details',
    props: ['fullTileInfo', 'mapSelected'],
    data() {
        return {
            search_image: true
        }
    },
    methods: {
        fetchSkulltulaCondition(num: number, arr: []) {
            let results = arr.filter((d: any) => d.identity === 'skulltula' && d.piece == num)[0]
            if (!results && num == 1) {return '-'}
            return results ? results.type : ''
        },
        fixMapCode(mapcode: string) {
            let fix = mapcode.slice(4, 6)
            return fix
        },
        getBackground(code: string) {
            return `background-image: url(../../assets/search/${code}.jpg)`
        },
        displayLocations(arr: []) {
            if (arr.identity == 'heartcontainer') {
                return `Heart Container - ${arr.area}`
            } else if (arr.identity == 'heartpiece') {
                return `Heart Piece - ${arr.area}`
            } else if (arr.identity == 'fairy') {
                return `Fairy - ${arr.area}`
            } else if (arr.identity == 'salon') {
                return `Fairy Clothes - ${arr.area}`
            } else if (arr.identity == 'food') {
                return `Fairy Food - ${arr.area}`
            } else {
                return ''
            }
        }
    }
}
</script>