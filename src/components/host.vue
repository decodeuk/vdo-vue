<template>
    <div v-if="active" class="vdo-host">
        <h4>Host</h4>
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
            role: 'host'
        }
    },

    computed: {},

    watch: {
        hostConnection: function(connection) {
            this.validateRoles(connection);
        }
    },

    mounted() {},

    methods: {}
});
</script>
