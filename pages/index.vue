<template>
  <div>
    <header>
      <div id="navbarHeader" class="collapse bg-dark">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">
                About walt.id
              </h4>
              <p class="text-muted">
                <b>walt.id</b> is a European company that develops Self-
                Sovereign Identity (SSI) solutions for governments and
                businesses across industries.
                We offer an easy and fast way to adopt SSI - particularly
                Europe’s new decentralized digital identity ecosystem -
                based on robust open source products. To ensure client’s
                success our industry-leading experts provide holistic
                services ranging from conception and project planning
                over the implementation of proof-of-concepts and
                production system to enterprise support and managed
                cloud services..
              </p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">
                Coordinates
              </h4>
              <ul class="list-unstyled">
                <li><a href="https://walt.id" class="text-white">web: https://walt.id</a></li>
                <li><a href="https://docs.walt.id" class="text-white">docs: https://docs.walt.id</a></li>
                <li><a href="https://github.com/walt-id" class="text-white">src: https://github.com/walt-id</a></li>
                <li><a href="mailto:office@walt.id" class="text-white">mail: office@walt.id</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a href="#" class="navbar-brand d-flex align-items-center">

            <!--        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">-->
            <!--          <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>-->
            <!--          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>-->
            <!--        </svg>-->
            <img class="me-3" src="/waltid-white-logo.png" alt="" width="50px">
            <strong>walt.id</strong>
          </a>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="$i18n.setLocale(locale.code)">
                <img :src="locale.flag" width="20px" height="15px" :alt="locale.iso" class="me-2 border border-white" />
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-normal">
              {{$t('CLAIM_CREDENTIALS')}}
            </h1>
            <p class="lead text-muted fw-normal mb-4">
              {{$t('SELECT_CREDENTIALS_MSG')}}
            </p>
              <form>
                <div class="d-flex flex-column align-items-md-center align-items-sm-start text-start">
                  <div class="form-check col-md-9 col-sm-12 mb-3" v-for="issuable in issuables.credentials" :key="issuable.type">
                    <input class="form-check-input me-4" type="checkbox" :id="'issuable-' + issuable.type" :name="'issuable-' + issuable.type" :value="issuable.type" v-model="checkedCredentials">
                    <label class="form-check-label">{{/*issuable.type*/}}{{$t(issuable.type)}} |</label>
                    <button type="button" data-bs-toggle="modal" :data-bs-target="'#credentilModal'+issuable.type" class="text-primary _view-btn mb-2"><i class="bi bi-box-arrow-up-right p-1"></i></button>
                    <!--Credendtial Modal -->
                    <div class="modal fade" :id="'credentilModal' + issuable.type" tabindex="-1" :aria-labelledby="'credentilModal'+issuable.type" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{$t('EDIT_CREDENTIAL')}}</h5>
                            <div class="col _edit-btn d-flex flex-column align-items-right justify-content-right text-end">
                              <a @click="enableCredentialEditor ? disableInput() : enableInput()" href="#enable" :class="enableCredentialEditor ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="enableCredentialEditor ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                            </div>
                          </div>
                          <credential-editor :issuable="issuable" :enableEditor="enableCredentialEditor" class="modal-body" />
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">{{$t('CLOSE')}}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <b-check v-if="sessionId == null" v-model="preAuthorized" class="mb-2">Pre-authorized</b-check>
              <b-check v-if="sessionId == null" v-model="userPinRequired" class="mb-2">Requires user PIN</b-check>
              <input :disabled="!userPinRequired" v-if="userPinRequired" type="password" class="form-control border-primary mb-2 w-50 mx-auto" placeholder="PIN" aria-label="PIN" v-model="userPin" autocomplete="new-password">
              <button @click="goToWallet(wallets[0].id)" class="btn btn-primary py-2 px-5 _cbtn" :disabled="!canSubmit"><img v-if="btnLoading" src="loader.gif" width="20px"/><span v-else>{{$t('CONFIRM')}}</span></button>
              <button v-if="sessionId == null" @click="goToWallet('x-device')" class="btn btn-primary py-2 px-5 _cbtn" :disabled="!canSubmit"><i class="bi bi-upc-scan" /></button>
          </div>
          <b-modal id="qr-modal" static="true" centered>
            <div class="text-center" :v-show="qr-code-visible">
              <canvas :id="'qr-code'" />
              <div class="text-center small">
                <pre class="qr-url-pre"><code>{{ walletUrl }}</code></pre>
              </div>
            </div>
          </b-modal>
        </div>
      </section>
    </main>
    <footer class="fixed-bottom footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">{{ $config.copyright }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import CredentialEditor from '../components/CredentialEditor.vue'
import QRious from "qrious"
export default {
  components: { CredentialEditor },
  data () {
    return {
      checkedCredentials: [],
      enableCredentialEditor: false,
      btnLoading: false,
      qrCodeVisible: false,
      walletUrl: "",
      preAuthorized: true,
      userPinRequired: false,
      userPin: null
    }
  },
  computed: {
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    sessionId() {
      console.log("SESSION ID", this.$route.query)
      return this.$route.query.sessionId
    },
    canSubmit() {
      return this.checkedCredentials.length > 0 && !this.btnLoading && (!this.userPinRequired || this.userPin != null)
    }
  },
  async asyncData ({ $axios, query }) {
    const wallets = await $axios.$get('/issuer-api/wallets/list')
    const issuables = await $axios.$get('/issuer-api/credentials/listIssuables', { params: query })
    return { wallets, issuables }
  },
  mounted() {
    if(this.sessionId != null && this.issuables != null && this.issuables.credentials.length > 0) {
      this.checkedCredentials = this.issuables.credentials.map(iss => iss.type)
    }
  },
  methods: {
    reset(){
      this.enableCredentialEditor=false
      console.log(this.issuables[0])
    },
    enableInput(){
      this.enableCredentialEditor=true;
      this.btnDisabled=false;
    },
    disableInput(){
      this.enableCredentialEditor=false;
      this.btnDisabled=true;
    },
    async goToWallet (walletId) {
      this.btnLoading = true;
      console.log("Selected issuables:", this.checkedCredentials)
      let selectedIssuables = {
        credentials: this.issuables.credentials.filter(c => this.checkedCredentials.findIndex(cc => cc == c.type) >= 0)
      }
      console.log("Selected issuables:", selectedIssuables)
      const params = this.sessionId != null ? { "sessionId": this.sessionId } : { "walletId": walletId, "isPreAuthorized": this.preAuthorized, "userPin": this.userPin }
      this.walletUrl = await this.$axios.$post('/issuer-api/credentials/issuance/request', selectedIssuables, { params: params })
      if(this.sessionId != null || walletId != "x-device") {
        window.location = this.walletUrl
      } else {
        this.btnLoading = false;
        this.$bvModal.show("qr-modal")
        new QRious({
        element: document.getElementById('qr-code'),
          value: this.walletUrl,
          size: 300
        })
      }
    },
    tester(){
      console.warn(this.issuables.credentials)
    }
  }
}
</script>

<style scoped>
label{
  font-size: 20px;
  margin-top: -3px;
  font-weight: 600;
}
button._view-btn{
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}
.left-inner-addon {
    position: relative;
}
.left-inner-addon input {
    padding-left: 35px !important;
}
.left-inner-addon i {
    position: absolute;
    padding: 17px 15px;
    pointer-events: none;
}
.right-inner-addon {
    position: relative;
}
.right-inner-addon input {
    padding-right: 35px !important;
}
.right-inner-addon i {
    position: absolute;
    right: 0px;
    padding: 17px 15px;
    pointer-events: none;
}
.left-and-right-inner-addon {
    position: relative;
}
.left-and-right-inner-addon input {
    padding-right: 35px !important;
    padding-left: 35px !important;
}
.left-and-right-inner-addon i.right {
    position: absolute;
    right: 0px;
    padding: 17px 15px;
    pointer-events: none;
}
.right-inner-addon-b {
    position: relative;
}
.right-inner-addon-b input {
    padding-right: 35px !important;
}
.right-inner-addon-b i {
    position: absolute;
    right: 0px;
    padding: 17px 15px;
    pointer-events: none;
}
._forms input {
    width: 100%;
		padding: 1em !important;
		margin: 0em !important;
		box-sizing: border-box;
}
._edit-btn button{
  background-color: transparent;
  border: none;
}
._cbtn{
  width: 165px;
  height: 45px
}
._cbtn img{
  margin-top: -3px
}
.qr-url-pre {
  padding-bottom: 0.5em;
}
@media only screen and (max-width: 600px) {
  label{
  font-size: 14px;
  margin-top: -3px;
  font-weight: 600;
}
button._view-btn{
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
}
</style>