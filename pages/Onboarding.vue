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
      <section class="py-5 text-center container _onboarding">
        <div class="row py-lg-5">
          <div :class="this.wizardIndex === 0 ? 'col-lg-6 text-center col-md-8 mx-auto px-2 py-4 border border-1 border-sm-0 border-secondary rounded _verify': 'hide'">
            <h2 class="fw-bolder">
              {{/*$t('ONBOARDING')*/}}
              Onboarding Portal
            </h2>
            <div class="mt-3">
              <p>This service verifies your domain, your email and ETH account<br> and issues a Gaia-X Participant Credential.</p>
            </div>
            <div class="mt-2">
              <p class="fw-bold text-primary mb-1"><span>Authenticated DID</span></p>
              <div style="max-width:100%"><span style="overflow-wrap: break-word;">{{this.did}}</span></div >
            </div>
            <div class="mt-2">
              <div class="mb-3 d-flex justify-content-center">
                <div>
                  <a @click="wizardNext" class="d-flex justify-content-center align-items-center px-3 py-3 _input">
                    <div class="col-8 ps-3 text-start">
                      <span>Verify Domain</span>
                    </div>
                    <div class="col">
                      <i v-if="this.domainVerified" class="bi bi-check-circle-fill px-3 _checked text-primary"></i>
                      <i v-else class="bi bi-check-circle px-3 _checked"></i>
                    </div>
                    <div class="col">
                      <i class="bi bi-chevron-right px-3 _arrow"></i>
                    </div>
                  </a>
                  <!--<a class="d-flex justify-content-center align-items-center px-3 py-3 _input mt-3">
                    <div class="col-8 ps-3 text-start">
                      <span>Email</span>
                    </div>
                    <div class="col">
                      <i class="bi bi-check-circle px-3 _checked"></i>

                    </div>
                    <div class="col">
                      <i class="bi bi-chevron-right px-3 _arrow"></i>
                    </div>
                  </a>-->
                  <div class="d-flex justify-content-center align-items-center mt-3">
                    <button v-if="this.domainVerified" @click="issueCredential()" class="btn _submit-btn py-3 px-4 text-center">Issue Participant Credential</button>
                    <button v-else class="btn _submit-btn-inactive py-3 px-4 text-center"><img v-if="issueBtnLoading" src="loader.gif" width="20px"/><span v-else>Issue Participant Credential</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="this.wizardIndex === 1 ? 'col-lg-6 text-center col-md-8 mx-auto px-2 py-4 border border-1 border-secondary rounded _domain': 'hide'">
            <h2 class="fw-bolder">
              {{/*$t('ONBOARDING')*/}}
               Verify Domain
            </h2>
            <div class="mt-3">
              <p>Add the verification code as TXT record to the domains DNS records. </p>
            </div>
            <div class="mt-2">
              <div class="mb-3 d-flex justify-content-center">
                <div>
                  <form form action="" @submit.prevent="getVerificationCode" class="_form">
                    <div>
                      <input type="text" name="domain" id="domain" placeholder="example.com" :data="this.domain" v-model="domain"><br>
                      <button type="submit" name="submit" class="btn _submit-btn text-center">
                        <span v-if="this.txtVerificationLoading"><img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="domain On Verification loading" width="25px" style="opacity: 0.5"></span>
                        <span v-else>Get verification code</span>
                      </button>
                    </div>
                  </form>
                  <textarea name="txtVerification" id="txt-verification" :data="this.txtVerification" v-model="txtVerification"></textarea><br>
                  <div v-if="this.success" class="d-flex justify-content-end">
                    <button @click="onCopy" class="btn _copy-btn text-center">Copy <i class="bi bi-files"></i></button>
                  </div>
                  <button @click="verfiyDomain" class="btn _submit-btn text-center">Check domain</button>
                  <div class="_statue mt-3">
                    <p v-if="this.domainOnVerification" class="_fading">
                      <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="domain On Verification loading" width="25px"><br>
                      Domain name on verification
                    </p>
                    <p v-if="this.coppied" class="text-secondary _fading">TXT copied to clipboard</p>
                    <p v-if="this.domainVerified === false" class=text-danger style="width: 250px; overflow-wrap: break-word;">Could not retrieve the domain verification code at {{this.domain}}</p>
                    <span v-if="this.domainVerified === true" style="opacity: 0.7">
                      <img src="https://c.tenor.com/0AVbKGY_MxMAAAAM/check-mark-verified.gif"  alt="checkmark success" width="35px">
                    </span>
                    <p v-if="this.domainVerified === true" class=text-success>Domain ownership verified successfully</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer class="fixed-bottom footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">&#169; 2021 by walt.id </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { copyText } from 'vue3-clipboard'

export default {
	middleware: ["onboarding"],
  auth: false,
  data () {
    return {
      wizardIndex: 0,
      domain: null,
      domainOnVerification: false,
      domainVerified: null,
      txtVerificationLoading: false,
      txtVerification: '',
      emailOnVerification: false,
      emailVerified: null,
      issueBtnLoading: false,
      success: false,
      coppied: false,
    }
  },
  computed: {
    did () {
      console.log("UserInfo", this.$store.state.auth)
      return this.$store.state.auth.user.did
      //return '078dafa7-7f58-48c9-afc8-e700c3758aa5'
    },
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    sessionId() {
      console.log("SESSION ID", this.$route.query)
      return this.$route.query.sessionId
    }
  },
  methods:{
    wizardNext: function(){
      this.wizardIndex = this.wizardIndex+1
    },
    wizardBack: function(){
      this.wizardIndex = this.wizardIndex+1
    },
    wizard: function(index){
      this.wizardIndex = index
    },
    getVerificationCode: async function(){
      this.txtVerificationLoading=true
      this.$axios.$post("/onboarding-api/domain/generateDomainVerificationCode", {
          "domain": this.domain
      })
      .then(
        res=>{
           console.log(res)
           this.txtVerificationLoading=false
           this.txtVerification = res
           this.success=true
          }
      )
      .catch(
        e=>{
          console.log(e)
          this.txtVerificationLoading=false
        }
      )

    },
    verfiyDomain: function(){
      this.domainOnVerification = true;
      this.$axios.$post("/onboarding-api/domain/checkDomainVerificationCode", {
          "domain": this.domain
      })
      .then(
        res=>{
           console.log(res)
           this.domainOnVerification = false;
           if(res === true){
             this.domainVerified = true;
             setTimeout(()=>{
               this.wizardIndex=0
             }, 4500)
           }else if(res === false){
             this.domainVerified = false;
           }
      }
      )
      .catch(
        e=>{
          console.log(e)
          this.txtVerificationLoading=false
        }
      )
    },
    onCopy: function(){
        copyText(this.txtVerification, undefined, (error, event) => {
          if (error) {
            console.log(error)
          } else {
            this.coppied=true;
            setTimeout(()=>{
              this.coppied=false;
            }, 3000)
            console.log(event)
          }
        })
    },
    async issueCredential () {
      this.issueBtnLoading = true;
      const params = { "sessionId": this.sessionId }
      const walletUrl = await this.$axios.$post('/onboarding-api/issue', {}, { params: params })
      setTimeout(()=>{window.location = walletUrl}, 2000)
    },
  }

}
</script>
