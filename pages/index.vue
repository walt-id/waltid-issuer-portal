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
              Claim credentials
            </h1>
            <p class="lead text-muted fw-normal mb-4">
              Select the credential you want to get issued
            </p>
              <form>
                <div class="d-flex flex-column justify-content-center align-items-center text-start">
                  <div class="form-check col-md-9 col-sm-12 mb-3" v-for="issuable in issuableCredentials" :key="issuable.id">
                    <input class="form-check-input me-4" type="checkbox" :id="'issuable-' + issuable.id" :name="'issuable-' + issuable.id" :value="issuable.id" v-model="checkedCredentials">
                    <label class="form-check-label">{{/*issuable.type*/}}{{issuable.description}} |</label>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#credentilModal" class="text-primary _view-btn">View details</button>
                  </div>
                  <button @click="goToWallet(wallets[0].id)" class="btn btn-primary py-2 px-5">Confirm</button>
                </div>
              </form>
              <!-- Credendtial Modal -->
              <div class="modal fade" id="credentilModal" tabindex="-1" aria-labelledby="credentilModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">View Credential</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row _forms mb-3">
                          <div class="col-9">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 0 ? false : true" type="text" :class="inputIndex === 0 ? 'form-control border-primary' : 'form-control'" placeholder="First name" aria-label="First name" v-model="userData.firstName">
                            </div>
                          </div>
                          <div class="col-3 _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="enableInput(0)" href="#enable" class="p-0 text-primary fst-italic">Edite as issuer</a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-9">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 1 ? false : true" type="text" :class="inputIndex === 1 ? 'form-control border-primary' : 'form-control'" placeholder="Last name" aria-label="Last name" v-model="userData.lastName">
                            </div>
                          </div>
                          <div class="col-3 _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="enableInput(1)" href="#enable" class="p-0 text-primary fst-italic">Edite as issuer</a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-9">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 2 ? false : true" type="text" :class="inputIndex === 2 ? 'form-control border-primary' : 'form-control'" placeholder="..." aria-label="...">
                            </div>
                          </div>
                          <div class="col-3 _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="enableInput(2)" href="#enable" class="p-0 text-primary fst-italic">Edite as issuer</a>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">Close</button>
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
      },
      inputIndex: null,
      btnDisabled: true,
    }
  },
  async asyncData ({ $axios }) {
    const wallets = await $axios.$get('/issuer-api/wallets/list')
    const issuableCredentials = await $axios.$get('/issuer-api/credentials/listIssuables')
    return { wallets, issuableCredentials }
  },
  
  methods: {
    reset(){
      this.inputIndex=null
      console.log(this.issuableCredentials[0])
    },
    enableInput(index){
      this.inputIndex=index;
      this.btnDisabled=false;
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
</style>