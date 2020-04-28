<template>
    <div class="vdo-video">
        <span>{{role}} - {{connection.user.uid}}</span>
        <div ref="player" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        connection : {
            type: Object,
            default: null
        },
        role: {
            type: String,
            default: null
        }
    },

    data() {
        return {}
    },

    watch: {},

    computed: {},

    created() {},

    mounted() {
        if(typeof this.$refs.player !== 'undefined' && typeof this.$props.connection !== 'undefined') {
            let connectionElement = this.$props.connection.registerBind(this);

            if(connectionElement !== null) {
                this.$refs.player.append(connectionElement);
                this.$props.connection.registerOnDestroyFunction(this.vdoUnbind);

                this.$emit('vdo-connection-bind');
            }
        }
    },

    methods: {
        vdoUnbind: function() {
            if(typeof this.$refs.player !== 'undefined')
                this.$refs.player.innerHTML = "";

            this.$emit('vdo-connection-unbind');
        }
    }
});
</script>
