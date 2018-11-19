<template>
  <div id="app">
    <md-dialog class="gcp-picker-modal" v-if="path === '/picker'" :md-active="true">
      <DatasetSelector id="dicom-store-picker" event="onSelect" oidc-key="googleOAuthToken" canClose/>
    </md-dialog>
    <md-dialog v-if="path === '/uploader'"  :md-active="true">
      <DicomUploader id="dicom-uploader" oidc-key="googleOAuthToken" :url="stowRsUrl" event="onClose"/>
    </md-dialog>
    <div class="app-block">
      <h1 class="app-title">Web-components sandbox</h1>
      <div class="app-form">
        <label for="">Google Client App ID</label>
        <input type="text" v-model="googleClientId" />
        <button @click="saveCredentials">Save</button>
      </div>

      <button v-if="!isLoggedIn" class="app-btn-login" :disabled="!googleClientId" @click="login">LOGIN</button>
      <button v-else class="app-btn-logout" @click="logout">LOGOUT</button>

      <a class="app-ref" @click="path = '/picker'">Dicomstore Picker</a>
      <a class="app-ref" @click="path = '/uploader'">DICOM files uploader</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MdDialog from 'vue-material/dist/components/MdDialog';
Vue.use(MdDialog);

import DatasetSelector from './web-components/DatasetPicker/DatasetSelector.vue';
import DicomUploader from './web-components/DicomUploader/DicomUploader.vue';

export default {
  name: 'app',
  components: {
    DatasetSelector,
    DicomUploader
  },
  data: function() {
    return {
      foo: 1, // durty hack to make things updated. No idea, why $forceUpdate() didn't work out
      googleClientId:
        sessionStorage.getItem('googleClientId') ||
        '570420945968-pmtd0sjm7mmf3i5m7ld09aos1op3qva1.apps.googleusercontent.com',
      stowRsUrl:
        'https://healthcare.googleapis.com/v1alpha/projects/healthcare-api-215503/locations/us-central1/datasets/anton1/dicomStores/store2/dicomWeb'
    };
  },
  computed: {
    isLoggedIn: function() {
      return !!sessionStorage.getItem('googleOAuthToken');
    },
    path: {
      get: function() {
        if (this.foo) return location.pathname;
      },
      set: function(value) {
        history.pushState(null, '', value);
        this.foo += 1;
      }
    }
  },
  created: function() {
    /* eslint-disable */
    window.$ = result => {
      console.log(result);
      location.replace('/');
    };
  },
  mounted: function() {
    if (location.pathname === '/_oauth/google' && location.hash) {
      const pairsStr = location.hash.slice(1).split('&');
      pairsStr.forEach(pairStr => {
        const pair = pairStr.split('=');
        if (pair[0] === 'access_token') {
          sessionStorage.setItem('googleOAuthToken', JSON.stringify({ access_token: pair[1] }));
          location = '/';
          return;
        }
      });
    }
  },
  methods: {
    saveCredentials: function() {
      sessionStorage.setItem('googleClientId', this.googleClientId);
    },
    login: function() {
      const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      const params = {
        client_id: this.googleClientId,
        redirect_uri: 'http://localhost:8080/_oauth/google',
        response_type: 'token',
        scope:
          'profile email openid https://www.googleapis.com/auth/cloud-healthcare https://www.googleapis.com/auth/cloudplatformprojects.readonly',
        flowName: 'GeneralOAuthFlow'
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      location = url;
    },
    logout: function() {
      sessionStorage.removeItem('googleOAuthToken');
    }
  }
};
</script>
  
<style lang="stylus">
body
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  margin 0
#app
  .app-block
    margin 100px auto
    width 500px
  .app-ref
    display block
    color white
    margin 10px
  .app-form
    margin 30px
    input, label, button
      display block
      margin 5px
  .app-btn-login, .app-btn-logout
    margin 35px
.md-dialog
  background-color #161A1F !important
</style>
