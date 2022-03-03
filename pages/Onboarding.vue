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
          <div :class="this.wizardIndex === 0 ? 'col-lg-6 text-center col-md-8 mx-auto px-2 py-4 border border-1 border-secondary rounded _verify': 'hide'">
            <h2 class="fw-bolder">
              {{/*$t('ONBOARDING')*/}}
              Onboarding Portal
            </h2>
            <div class="mt-3">
              <p>This service verifies your domain, your email and ETH account<br> and issues a Gaia-X Participant Credential.</p>
            </div>
            <div class="mt-2">
              <p class="fw-bold text-primary mb-1"><span>Authenticated DID</span></p>
              <p><span>did:web:example.com:NsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH</span></p>
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
                  <a class="d-flex justify-content-center align-items-center px-3 py-3 _input mt-3">
                    <div class="col-8 ps-3 text-start">
                      <span>Email</span>
                    </div>
                    <div class="col">
                      <i class="bi bi-check-circle px-3 _checked"></i>

                    </div>
                    <div class="col">
                      <i class="bi bi-chevron-right px-3 _arrow"></i>
                    </div>
                  </a>
                  <div class="d-flex justify-content-center align-items-center mt-3">
                    <button v-if="this.domainVerified && this.emailVerified" class="btn _submit-btn py-3 px-4 text-center">Issue Participant Credential</button>
                    <button v-else class="btn _submit-btn-inactive py-3 px-4 text-center">Issue Participant Credential</button>
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
                  <form form action="" @submit.prevent="getVerificationCode">
                    <div>
                      <input type="text" name="domain" id="domain" placeholder="www.exemple.com">
                      <button type="submit" name="submit" class="btn _submit-btn py-2 px-4 text-center">Get verification code</button>
                    </div>
                  </form>
                  <textarea name="txtVerification" id="txt-verification" class="mt-3" :data="this.txtVerification" v-model="txtVerificationCode"></textarea>
                  <button @click="verfiyDomain" class="btn _submit-btn py-2 px-4 text-center mt-3">Check domain</button>
                  <div class="_statue mt-3">
                    <p v-if="this.domainOnVerification" class="_fading">
                      <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="domain On Verification loading" width="25px"><br>
                      Domain name on verification
                    </p>
                    <p v-if="this.domainVerified === false" class=text-danger>Your domain not verfied!</p>
                    <p v-else-if="this.domainVerified === true" class=text-success>Your domain name verfied successfully!</p>
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
export default {
	middleware: ["onboarding"],
  auth: false,
  data () {
    return {
      wizardIndex: 0,
      domainOnVerification: false,
      domainVerified: null,
      txtVerificationCode: '',
      emailOnVerification: false,
      emailVerified: null,

    }
  },
  computed: {
    did () {
      console.log("UserINfo ", this.$store.state.auth)
      //return this.$store.state.auth.user.did
      return '078dafa7-7f58-48c9-afc8-e700c3758aa5'
    },
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
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
    getVerificationCode: function(){
      this.txtVerificationCode = 'ssi-verification=8R9lJ0rt5q8gEQVeGbN6ibnpN8CxtXY1E5JL-mx9UXA'
    },
    verfiyDomain: function(){
      this.domainOnVerification = true;
      setTimeout(()=>{
        this.domainOnVerification = false;
        this.domainVerified = true;
        setTimeout(()=>{
          this.wizardIndex=0
        }, 3000)
      }, 3000)
    }
  }

}
</script>
