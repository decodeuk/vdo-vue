<template>
    <div v-if="active" class="vdo-participants">
        <h4>Participants</h4>
        <div v-for="connection in connections">
            <vdo-video :connection="connection" :role="connection.user.role" v-on:vdo-connection-unbind="vdoUnbind" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
    props: {
        includeContexts: {
            type: Object,
            default: () => {
                return {
                    host: true,
                    client: true,
                }
            }
        }
    },

    data() {
        return {
            active: false,
            connections: {}
        }
    },

    computed: {
        ...mapGetters({
            connected: "vdo/sessionConnected",
            allConnections: "vdo/getConnections"
        })
    },

    watch: {
        allConnections: function(connections) {
            this.filterConnections(connections);
        }
    }

    created() {},

    mounted() {},

    methods: {
        filterConnections: function(connections) {
            // Loop new allConnections and add to local connections (if context included)
            for(let id in connections) {
                if(this.$vdo.isVdoConnection(connections[id])) {
                    if(connections[id].bind !== null)
                        continue;

                    if(connections[id].isLocal() && (typeof this.$props.includeContexts.client !== 'undefined' && this.$props.includeContexts.client === false))
                        continue;

                    if(connections[id].user.role === 'host' && (typeof this.$props.includeContexts.host !== 'undefined' && this.$props.includeContexts.host === false))
                        continue;

                    this.$set(this.connections, id, connections[id]);
                }
            }
            // Loop local connections and remove any no longer in allConnections
            for(let id in this.connections) {
                if(Object.keys(connections).indexOf(id) === -1)
                    this.$delete(this.connections, id);
            }

            this.active = (Object.keys(this.connections).length > 0);
        },
        vdoUnbind: function(e) {
            // console.log('participants saw an unbind')
        }
    }
});
</script>
