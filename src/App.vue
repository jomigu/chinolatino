<template>
  <nav>
    <p v-if="email && validBrowser" class="mt-3">
      <a href="/chinolatino">
        <small>Home</small>
      </a>
      <span>&nbsp;|&nbsp;</span>
      <small>Logged-in as {{ email }}.</small>
      <span>&nbsp;|&nbsp;</span>
      <a href="#" @click="signOut">
        <small>Sign-out</small>
      </a>
    </p>
    <p v-else-if="validBrowser">
      <button @click="signIn" type="button" class="btn btn-lg btn-primary mt-5">Google Log-in</button>
    </p>
    <p v-show="loginError" class="text-danger">
      <small>Try again</small>
    </p>
    <p v-show="!validBrowser" class="mt-5">
      <span>
        This browser is not supported, please open this page on your device's browser
        (preferably Chrome, Safari or Firefox).
      </span>
    </p>
    <p v-show="!validBrowser" class="mt-5">
      <a :href="url">{{ url }}</a>
    </p>
    <div v-show="!validBrowser" class="video-container mt-5">
      <p>
        <span>You may <a href="#" @click="playVideo">play</a> the video below on how to open the page from here.</span>
      </p>
      <video id="messenger-video" controls>
        <source src="@/assets/opening-from-facebook.mp4" type="video/mp4" />
      </video>
    </div>
  </nav>
  <router-view v-if="email && validBrowser" />
</template>

<script>
import { inject } from 'vue'
import { detect } from 'detect-browser'

export default {
  data() {
    return {
      email: null,
      loginError: false,
      validBrowser: true,
      url: ''
    }
  },
  methods: {
    async signIn() {
      this.loginError = false

      const result = await this?.$gAuth?.signIn()?.catch(() => {
        return null
      })

      if (result) {
        this.email = result.getBasicProfile().getEmail()
        localStorage.setItem('email', this.email)
        if (!this.email) {
          this.loginError = true
        }
      } else {
        this.loginError = true
      }
    },
    async signOut() {
      await this.$gAuth.signOut()
      this.email = null
      localStorage.setItem('email', '')
    },
    authenticated() {
      return this.email != null
    },
    playVideo() {
      document.getElementById('messenger-video').play()
    }
  },
  mounted() {
    this.email = localStorage.getItem('email')
    this.url = window.location.href
    const browser = detect()
    this.validBrowser = ['chrome', 'safari', 'firefox', 'opera', 'edge']
      .indexOf(browser.name) > -1
  },
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth")
    return {
      Vue3GoogleOauth,
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.video-container video {
  width: 100%;
  height: auto;
}
</style>
