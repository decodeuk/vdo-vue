import { mapGetters } from "vuex";

export default {
    props: {
        includeRoles: {
            type: Object,
            default: () => {
                return {
                    host: true,
                    participant: true
                }
            }
        }
    },

    data() {
        return {
            active: false,
            role: null,
            connection: null,
        }
    },

    computed: {
        ...mapGetters({
            connected: "vdo/sessionConnected",
            hostConnection: "vdo/hostConnection",
            clientConnection: "vdo/clientConnection"
        })
    },

    watch: {},

    created: function () {},

    mounted: function() {},

    methods: {
        _bindConnection: function(connection) {
            if(connection.bind == null && this.connection == null) {
                this.connection = connection;
                this.active = true;

                return connection;
            }
        },
        validateRoles: function(connection) {
            if(this.$vdo.isVdoConnection(connection)) {
                if(this.role == 'host' && connection.user.role == this.role && this.$props.includeRoles[connection.user.role])
                    return this._bindConnection(connection);

                if(this.role !== 'host' && this.$props.includeRoles[connection.user.role])
                    return this._bindConnection(connection);
            }

            return null;
        },
        vdoUnbind: function() {
            this.connection = null;
            this.active = false;
        }
    }
}
