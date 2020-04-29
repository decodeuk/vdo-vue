---
layout: simple
title: Vdox Documentation
permalink: /vdox/
---

# Vdox Documentation

The following documentation is provided as a guide to getting started with Vdox (Vuex Plugin).

## Setting Up Vdox

1. Import into Vuex store

    Add the following line towards the top of your Vuex store file (typically store.js):

    ```js
    import { Vdo, Vdox } from '@decodeuk/vdo-vue';
    ```
1. Include the plugin

    Add an array assigned to a _plugins_ property to the Vuex store object. Then add _Vdox_ as a value in the array.

    ```js
    plugins: [Vdox],
    ```


## Next Steps

1. [Getting Started](../)
1. Methods
1. Session Ids
1. User Tokens
1. Components
1. Events
