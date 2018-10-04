<template>
  <div id="app">
    <md-dialog class="gcp-picker-modal" v-if="cmp==='picker' || path === '/q'" :md-active="true">
      <DatasetPicker :onSelect="onSelect" id="dicom-store-picker" event="on-select" :token="googleOAuthToken" />
    </md-dialog>
    <md-dialog v-if="cmp==='uploader'">
      <DicomUploader  :onSelect="cmp = ''" />
    </md-dialog>
    <div class="app-block">
      <h1 class="app-title">Web-components sandbox</h1>
      <div class="app-form">
        <label for="">Google Client App ID</label>
        <input type="text" v-model="googleClientId" />
        <button @click="saveCredentials">Save</button>
      </div>

      <button v-if="!googleOAuthToken" class="app-btn-login" :disabled="!googleClientId" @click="login">LOGIN</button>
      <button v-else class="app-btn-logout" @click="logout">LOGOUT</button>

      <a class="app-ref" @click="cmp='picker'">Dicomstore Picker</a>
      <a class="app-ref" @click="cmp='uploader'">DICOM files uploader</a>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MdDialog from 'vue-material/dist/components/MdDialog';
Vue.use(MdDialog);

import DatasetPicker from './web-components/DatasetPicker/DatasetPicker.vue';
import DicomUploader from './web-components/DicomUploader/DicomUploader.vue';

/* eslint-disable */

export default {
  name: 'app',
  components: {
    DatasetPicker,
    DicomUploader
  },
  data: function() {
    return {
      googleClientId:
        sessionStorage.getItem('googleClientId') ||
        '570420945968-pmtd0sjm7mmf3i5m7ld09aos1op3qva1.apps.googleusercontent.com',
      googleOAuthToken: sessionStorage.getItem('googleOAuthToken'),
      cmp: ''
    };
  },
  computed: {
    path: function() {
      return location.pathname;
    }
  },
  mounted: function() {
    if (location.pathname === '/_oauth/google' && location.hash) {
      const pairsStr = location.hash.slice(1).split('&');
      pairsStr.forEach(pairStr => {
        const pair = pairStr.split('=');
        if (pair[0] === 'access_token') {
          sessionStorage.setItem('googleOAuthToken', pair[1]);
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
    },
    onSelect: function(data) {
      alert(JSON.stringify(data, null, '  '));
      this.cmp = '';
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
