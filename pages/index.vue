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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-check2-square"
              viewBox="0 0 16 16"
            >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>

            <strong>Issuer Portal</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-normal">
              Claim Vaccination Credential
            </h1>
            <p class="lead text-muted fw-normal">
              On this page a "holder" (receiver of credential) can claim one or more credentials and start the issuing-process. For the sake of the demo, the data can directly be altered below.
            </p>
              <form>
                <div v-for="issuable in issuableCredentials" :key="issuable.id" class="row">
                  <input
                    type="checkbox"
                    :id="'issuable-' + issuable.id"
                    :name="'issuable-' + issuable.id"
                    :value="issuable.id"
                    v-model="checkedCredentials"
                    checked />
                  <label :for="'issuable-' + issuable.id">{{issuable.type}} | {{issuable.description}}</label>
                </div>
                <div class="row _forms">
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-card-text"></i>
                      <input type="text" class="form-control" placeholder="First name" aria-label="First name" v-model="userData.firstName">
                    </div>
                  </div>
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-card-text"></i>
                      <input type="text" class="form-control" placeholder="Family name" aria-label="Family name" v-model="userData.familyName">
                    </div>
                  </div>
                </div>
                <div class="row _forms">
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-calendar"></i>
                      <input type="text" class="form-control" placeholder="Date of birth" aria-label="Date of birth" v-model="userData.dateOfBirth">
                    </div>
                  </div>
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-people"></i>
                      <input type="text" class="form-control" placeholder="Gender" aria-label="Gender" v-model="userData.gender">
                    </div>
                  </div>
                </div>
                <div class="row _forms">
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-map"></i>
                      <input type="text" class="form-control" placeholder="Place of birth" aria-label="Place of birth" v-model="userData.placeOfBirth">
                    </div>
                  </div>
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <i class="bi bi-geo-alt"></i>
                      <input type="text" class="form-control" placeholder="Address" aria-label="Address" v-model="userData.currentAddress">
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row _forms">
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <input type="text" class="form-control" placeholder="ECTS Credit Points" aria-label="ECTS Credit Points" v-model="userData.ectsCreditPoints">
                    </div>
                  </div>
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <input type="text" class="form-control" placeholder="EQF Level" aria-label="EQF Level" v-model="userData.eqfLevel">
                    </div>
                  </div>
                </div>
                <div class="row _forms">
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <input type="text" class="form-control" placeholder="ISCEDF Code" aria-label="ISCEDF Code" v-model="userData.iscedfCode">
                    </div>
                  </div>
                  <div class="col">
                    <div class="right-inner-addon input-container">
                      <input type="text" class="form-control" placeholder="NQF Level" aria-label="NQF Level" v-model="userData.nqfLevel">
                    </div>
                  </div>
                </div>
              </form>
            <p>
              <!--<a
                href="#"
                class="btn btn-primary my-2"
                @click="createPopupWin('/issuer-api/credentials/issuance/request?walletId='+wallets[0].id+'&'+getSelectedCredentialsParams(), wallets[0].description, 500, 700)"
              >Issue to {{ wallets[0].id }} - POPUP</a>-->
              <br><br>
<!--              <button @click="goToWallet(wallets[0].id)" class="btn btn-primary my-2">Issue to {{ wallets[0].id }}</button>-->
              <button @click="goToWallet(wallets[0].id)" class="btn btn-primary my-2">Issue to web-wallet</button>
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">&#169; 2021 by walt.id </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedCredentials: [],
      userData: {
        firstName: '',
        familyName: '',
        dateOfBirth: '',
        gender: 'MALE',
        placeOfBirth: 'Vienna',
        currentAddress: 'Stefansplatz 1, 1010 Wien, Austria',
        ectsCreditPoints: '',
        eqfLevel: '',
        iscedfCode: '',
        nqfLevel: ''
      }
    }
  },
  async asyncData ({ $axios }) {
    const wallets = await $axios.$get('/issuer-api/wallets/list')
    const issuableCredentials = await $axios.$get('/issuer-api/credentials/listIssuables')
    return { wallets, issuableCredentials }
  },
  methods: {
    createPopupWin (pageURL, pageTitle, popupWinWidth, popupWinHeight) {
      const left = ((screen.width / 2) - (popupWinWidth / 2))
      const top = (screen.height / 4)
      window.open(pageURL, pageTitle, 'location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes, width=' + popupWinWidth + ', height=' + popupWinHeight + ', top=' + top + ', left=' + left)
    },
    getSelectedCredentialsParams () {
      return this.checkedCredentials.map(id => 'issuableId=' + id).join('&')
    },
    async goToWallet (walletId) {
      const params = new URLSearchParams(this.userData)
      this.checkedCredentials.forEach(id => params.append('issuableId', id))
      params.append('walletId', walletId)
      const walletUrl = await this.$axios.$get('/issuer-api/credentials/issuance/request', { params })
      window.location = walletUrl
    }
  }
}
</script>

<style scoped>
.input-container {
	padding-bottom: 1em;
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

input {
    width: 100%;
		padding: 1em !important;
		margin: 0em !important;
		box-sizing: border-box;
}
</style>
