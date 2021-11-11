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
            <h1 class="fw-light">
              Claim credentials
            </h1>
            <p class="lead text-muted">
              Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so
              folks don’t simply skip over it entirely.
            </p>
            <p>
              <div v-for="issuable in issuableCredentials" :key="issuable.id">
                <input
                  type="checkbox"
                  :id="'issuable-' + issuable.id"
                  :name="'issuable-' + issuable.id"
                  :value="issuable.id"
                  v-model="checkedCredentials"
                  checked />
                <label :for="'issuable-' + issuable.id">{{issuable.type}} | {{issuable.description}}</label>
              </div>
            </p>
            <p>
              <a
                href="#"
                class="btn btn-primary my-2"
                @click="createPopupWin('/issuer-api/credentials/issuance/request?walletId='+wallets[0].id+'&'+getSelectedCredentialsParams(), wallets[0].description, 500, 700)"
              >Issue to {{ wallets[0].id }} - POPUP</a>
              <br><br>
              <button @click="goToWallet(wallets[0].id)" class="btn btn-primary my-2">Issue to {{ wallets[0].id }} - LINK</button>
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
      checkedCredentials: []
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
      const params = new URLSearchParams()
      this.checkedCredentials.forEach(id => params.append('issuableId', id))
      params.append('walletId', walletId)
      const walletUrl = await this.$axios.$get('/issuer-api/credentials/issuance/request', { params })
      window.location = walletUrl
    }
  }
}
</script>
