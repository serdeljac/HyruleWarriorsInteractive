<template>
    <section class="mapdetails">
        Code: {{ tileData }}
    </section>  
</template>

<script lang="ts">
export default {
    name: "Header and Filter",
    props: {
        tileData: []
    },
}
</script>