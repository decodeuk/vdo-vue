import Vue from 'vue';
import { vdoHandler, vdoPublisher, Events } from '@decodeuk/vdo-client';
import Vdox from './vdox';

import Host from './components/host.vue';
import Client from './components/client.vue';
import Participants from './components/participants.vue';
import VideoPlayer from './components/player/video.vue';
import ConnectionButton from './components/buttons/connection.vue';

// TODO: Handle forcing Hosts to allow participant / viewers access to the Session content
// TODO: Add switches for DEV or PROD env (including switch for /tokenise API)

let Vdo = {
    // The install method will be called with the Vue constructor as
    // the first argument, along with possible options
    install(Vue, options) {
        this.options = options || {};
        this.token = this.options.token || null;

        if(typeof this.options.sessionId !== 'undefined') {
            this.setSessionId(this.options.sessionId);
        }

        this._listen();

        // Setup the Session handler (which auto creates instance if sessionId passed in options)
        this.session = new vdoHandler(this.options);

        this.publisher = new vdoPublisher(this.session);

        // Establish Event Bus to be used for app communications
        this.bus = new Vue();

        // Add or modify global methods or properties.
        // Vue.yourMethod = (value) => '!'+value;

        // Add a component or directive to your plugin, so it will be installed globally to your project.
        Vue.component('vdo-video', VideoPlayer);
        Vue.component('vdo-video-host', Host);
        Vue.component('vdo-video-client', Client);
        Vue.component('vdo-video-participants', Participants);
        Vue.component('vod-button-connection', ConnectionButton);

        // Add `Vue.mixin()` to inject options to all components.
        // Vue.mixin({
            // Add component lifecycle hooks or properties.
            // created() {
            //     console.log('You\'ve installed the VDO plugin!')
            // }
        // });

        // Expose this as $vdo property available to all Vue instances
        Vue.prototype.$vdo = this;

        // TEMPORARY
        window.vdo = this;
    },

    setSessionId(id, autoInit) {
        if(id)
            this.session.createSession(id);

        if(autoInit && autoInit === true)
            this.init();
    },

    setToken(token) {
        if(token)
            this.token = token;
    },

    init() {
        if(typeof this.options.apiKey === 'undefined' || this.sessionId === null)
            return this._handleError('Missing API Key or Session ID');

        this.session.initSession();
    },

    connect(token, callback) {
        token = token || this.token;

        if(!token)
            return this._handleError('Missing Token');

        this.token = token;

        this.session.connectSession(this.token, callback);
    },

    disconnect() {
        this.session.disconnectSession();
    },

    publish(callback) {
        this.session.startPublishing(this.publisher, callback);
    },

    unpublish() {
        this.session.stopPublishing(this.publisher);
    },

    getConnections() {
        return this.session.getConnections();
    },

    isVdoConnection(connection) {
        return (connection !== null && typeof connection == 'object' && typeof connection.constructor !== 'undefined' && connection.constructor.name == 'vdoConnection');
    },

    _listen() {
        Events.subscribe('vdo.session.connected', bool => {
            // Triggered when session connection state changes
            this.bus.$emit('session.connected', {
                connected: bool
            });
        });
        Events.subscribe('vdo.publisher.ready', bool => {
            // Tiggered on successful init of publisher
            this.bus.$emit('publisher.ready', {
                ready: bool
            });
        });
        Events.subscribe('vdo.connection.new', connection => {
            // Triggered after connection stream has been set (local) / subscribed to (remote)
            this.bus.$emit('connection.new', {
                connection: connection
            });
        });
        Events.subscribe('vdo.connection.destroy', id => {
            // Triggered after connection is destroyed
            this.bus.$emit('connection.destroy', {
                id: id
            });
        });
        Events.subscribe('vdo.connection.local', connection => {
            // Triggered when local connection is registered (regardless of role)
            this.bus.$emit('connection.local', {
                connection: connection
            });
        });
        Events.subscribe('vdo.connection.host', connection => {
            // Triggered when remote connection is registered (role=host)
            this.bus.$emit('connection.host', {
                connection: connection
            });
        });
        Events.subscribe('vdo.connection.count', num => {
            // Triggered after connections are registered or de-registered
            this.bus.$emit('connection.count', {
                count: num
            });
        });
    },

    _handleError(err) {
        // TODO: Add propper Vue Error Handling
        if(err)
            console.log('VDO Error: '+err);
    }
}

export {
    Vdo as default,
    Vdo,
    Vdox
}
