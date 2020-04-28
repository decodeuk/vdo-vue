<template>
    <div class="vdo-button" :class="{'vdo-state-connected': connected, 'vdo-state-disconnected': !connected}">
        <button v-if="!connected" @click="connect">Connect</button>
        <button v-if="connected" @click="disconnect">Disconnect</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    mixins: [],

    data() {
        return {

        }
    },

    computed: {
        ...mapGetters({
            connected: "vdo/sessionConnected"
        })
    },

    watch: {

    },

    mounted() {

    },

    methods: {
        connect() {
            this.$vdo.connect();
        },
        disconnect() {
            this.$vdo.disconnect();
            // this.$vdo.publisher.destroy();
        }
    }
});
</script>
