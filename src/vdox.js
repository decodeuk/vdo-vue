import Vue from 'vue';
import { Events } from '@decodeuk/vdo-client';

let Vdox = store => {
    store.registerModule('vdo', {
        namespaced: true,
        state () {
            return {
                session: {
                    id: null,
                    connected: false
                },
                user: {
                    token: null
                },
                connections: {},
                host: null,
                client: null
            }
        },
        getters: {
            userToken(state) {
                return state.user.token;
            },
            sessionId(state) {
                return state.session.id;
            },
            sessionConnected(state) {
                return state.session.connected;
            },
            hostConnection(state) {
                if(state.host !== null && typeof state.connections[state.host] !== 'undefined')
                    return state.connections[state.host];

                return null;
            },
            clientConnection(state) {
                if(state.client !== null && typeof state.connections[state.client] !== 'undefined')
                    return state.connections[state.client];

                return null;
            },
            getConnections(state) {
                return state.connections;
            }
        },
        mutations: {
            setUserToken(state, token) {
                state.user.token = token;
            },
            setSessionId(state, id) {
                state.session.id = id;
            },
            updateSessionState(state, bool) {
                state.session.connected = bool;
            },
            addConnection(state, connection) {
                Vue.set(state.connections, connection.id, Vue.observable(connection));
            },
            removeConnection(state, id) {
                Vue.delete(state.connections, id);
            },
            setHost(state, id) {
                state.host = id;
            },
            setClient(state, id) {
                state.client = id;
            }
        },
        actions: {
            setUserToken({commit}, token) {
                commit('setUserToken', token);
            },
            setSessionId({commit}, id) {
                commit('setSessionId', id);
            },
            updateSessionState({commit}, bool) {
                commit('updateSessionState', bool);
            },
            addConnection({commit, state}, connection) {
                if(state.host == null && connection.user.role == 'host')
                    commit('setHost', connection.id);

                if(state.client == null && connection.isLocal())
                    commit('setClient', connection.id);

                commit('addConnection', connection);
            },
            removeConnection({commit, state}, id) {
                if(state.host !== null && state.host == id)
                    commit('setHost', null);

                if(state.client !== null && state.client == id)
                    commit('setClient', null);

                commit('removeConnection', id);
            }
        }
        // mutations, actions, getters...
    });

    Events.subscribe('vdo.session.token', token => store.dispatch('vdo/setUserToken', token));
    Events.subscribe('vdo.session.id', id => store.dispatch('vdo/setSessionId', id));
    Events.subscribe('vdo.session.connected', bool => store.dispatch('vdo/updateSessionState', bool));
    Events.subscribe('vdo.connection.new', connection => store.dispatch('vdo/addConnection', connection));
    Events.subscribe('vdo.connection.destroy', id => store.dispatch('vdo/removeConnection', id));

    store.subscribe((mutation, state) => {
        // called after every mutation.
        // The mutation comes in the format of `{ type, payload }`.
    })
};

export default Vdox;
