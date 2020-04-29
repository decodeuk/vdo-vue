---
title: VDO Vue Documentation
permalink: /
---

## Getting started

The guide assumes that you already have your base Vue app structure in place and are using NPM as your package manager.

1. Install package

    At the command line run:

    ```shell
    npm install @decodeuk/vdo-vue;
    ```

    **Note:** You can use the appropriate save flags as required (_--save_ or _--save-dev_). If using a build tool such as Parcel then use _--save-dev_.

1. Import into your main Vue application file

    Add the following line towards the top of your Vue file:

    ```js
    import Vdo from '@decodeuk/vdo-vue';
    ```

1. Set Vue to use the Vdo plugin

    Underneath, set Vue to use Vdo passing your _apiKey_ as a value of the options object:

    ```js
    Vue.use(Vdo, {"apiKey": "<your-api-key>"});
    ```

1. You can now initialise Vdo within your App

    Navigate to the place within your application you'd like to initialise Vdo. A good place for this would be
    the _created()_ hook within your main App.vue (as shown below), however it could be done within a more specific component if only
    a small feature of the app.

    ```js
    created() {
        this.$vdo.setSessionId(<your-session-id>);
        this.$vdo.init();
    }
    ```

    **Note:** You can set the Session Id earlier in the lifecycle of your application if you know it. It can also be set as a _sessionId_ property of your options object instead when calling the _Vue.use()_ method earlier.


## Next Steps

1. [Setting up Vdox (Vuex Plugin)](./vdox/)
1. Methods
1. Session Ids
1. User Tokens
1. Components
1. Events
