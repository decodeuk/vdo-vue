<template>
    <div v-if="active" class="vdo-client">
        <h4>Client</h4>
        <vdo-video ref="video" :connection="connection" :role="role" v-on:vdo-connection-unbind="vdoUnbind" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import RoleMixin from '../mixins/role.js';

export default Vue.extend({
    mixins: [RoleMixin],

    data() {
        return {
            role: 'client'
        }
    },

    computed: {},

    watch: {
        clientConnection: function(connection) {
            this.validateRoles(connection);
        }
    },

    mounted() {},

    methods: {}
});
</script>
