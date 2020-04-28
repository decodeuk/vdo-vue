---
title: VDO Vue Documentation
permalink: /
---

## Getting started

The guide assumes that you already have your base Vue app structure in place and are using NPM as your package manager.

1. Install package

    At the command line run:

    ```js
    npm install @decodeuk/vdo-vue
    ```

    **Note:** You can use the appropriate save flags as required (_--save_ or _--save-dev_). If using a build tool such as Parcel then use _--save-dev_.

2. Import into your main Vue application file

    Add the following line towards the top of your Vue file:

    ```js
    import Vdo from '@decodeuk/vdo-vue';
    ```

3. Set Vue to use the Vdo plugin

    Underneath, set Vue to use Vdo passing your _apiKey_ as a value of the options object:

    ```js
    Vue.use(Vdo, {"apiKey": "<your-api-key>"});
    ```

## Next Steps

1. [Setting up Vdox (Vuex Plugin)](./vdox/)
1. Initialising $vdo
1. Session Ids
1. User Tokens
1. Components
