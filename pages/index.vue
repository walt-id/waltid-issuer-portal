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

            <strong>MyGuichet</strong>
          </a>
          <ul class="nav navbar-nav navbar-right">
            <li>
          <a
            href="#"
            v-for="locale in availableLocales"
            :key="locale.code"
            @click.prevent.stop="$i18n.setLocale(locale.code)">{{ locale.code }} | </a>


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
                  <div class="form-check col-md-9 col-sm-12 mb-3" v-for="(issuable, key) in issuables.credentials" :key="key">
                    <input class="form-check-input me-4" type="checkbox" :id="'issuable-' + key" :name="'issuable-' + key" :value="key" v-model="checkedCredentials">
                    <label class="form-check-label">{{/*issuable.type*/}}{{$t(issuable.type)}} |</label>
                    <button type="button" data-bs-toggle="modal" :data-bs-target="'#credentilModal'+key" class="text-primary _view-btn mb-2"><i class="bi bi-box-arrow-up-right p-1"></i></button>
                  </div>
                </div>
              </form>
              <button @click="goToWallet(wallets[0].id)" class="btn btn-primary py-2 px-5 _cbtn" :disabled="this.checkedCredentials.length > 0 ? false : true"><img v-if="btnLoading" src="loader.gif" width="20px"/><span v-else>{{$t('CONFIRM')}}</span></button>
              <!--Credendtial Modal -->
              <div class="modal fade" id="credentilModalVerifiableId" tabindex="-1" aria-labelledby="credentilModalVerifiableIdLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{$t('EDIT_CREDENTIAL')}}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 0 ? false : true" type="text" :class="inputIndex === 0 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.FIRST_NAME')" aria-label="First name" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.firstName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 0 ? disableInput(null) : enableInput(0)" href="#enable" :class="inputIndex === 0 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 0 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 1 ? false : true" type="text" :class="inputIndex === 1 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.LAST_NAME')" aria-label="Family name" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.familyName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 1 ? disableInput(null) : enableInput(1)" href="#enable" :class="inputIndex === 1 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 1 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-people"></i>
                              <input :disabled="inputIndex ===2 ? false : true" type="text" :class="inputIndex === 2 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.GENDER')" aria-label="Gender" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.gender">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 2 ? disableInput(null) : enableInput(2)" href="#enable" :class="inputIndex === 2 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 2 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 3 ? false : true" type="text" :class="inputIndex === 3 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DATE_OF_BIRTH')" aria-label="DateOfBirth" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.dateOfBirth">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 3 ? disableInput(null) : enableInput(3)" href="#enable" :class="inputIndex === 3 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 3 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-map"></i>
                              <input :disabled="inputIndex === 4 ? false : true" type="text" :class="inputIndex === 4 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.NATIONALITY')" aria-label="Nationality" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.nationality">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 4 ? disableInput(null) : enableInput(4)" href="#enable" :class="inputIndex === 4 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 4 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-geo-alt"></i>
                              <input :disabled="inputIndex === 5 ? false : true" type="text" :class="inputIndex === 5 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.PLACE_OF_BIRTH')" aria-label="PlaceOfBirth" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.placeOfBirth">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 5 ? disableInput(null) : enableInput(5)" href="#enable" :class="inputIndex === 5 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 5 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-credit-card-2-front"></i>
                              <input :disabled="inputIndex === 6 ? false : true" type="text" :class="inputIndex === 6 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.PERSONAL_IDENTIFIER')" aria-label="PersonalIdentifier" v-model="issuables.credentials.VerifiableId.credentialData.credentialSubject.personalIdentifier">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 6 ? disableInput(null) : enableInput(6)" href="#enable" :class="inputIndex === 6 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 6 ? 'bi bi-check-square' : 'bi bi-pencil-square' "></i></a>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">{{$t('CLOSE')}}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="credentilModalVerifiableDiploma" tabindex="-1" aria-labelledby="credentilModalVerifiableDiplomaLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{$t('EDIT_CREDENTIAL')}}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 0 ? false : true" type="text" :class="inputIndex === 0 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.FIRST_NAME')" aria-label="First name" v-model="issuables.credentials.VerifiableDiploma.credentialData.credentialSubject.givenNames">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 0 ? disableInput(null) : enableInput(0)" href="#enable" :class="inputIndex === 0 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 0 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 1 ? false : true" type="text" :class="inputIndex === 1 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.LAST_NAME')" v-model="issuables.credentials.VerifiableDiploma.credentialData.credentialSubject.familyName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 1 ? disableInput(null) : enableInput(1)" href="#enable" :class="inputIndex === 1 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 1 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 2 ? false : true" type="text" :class="inputIndex === 2 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DATE_OF_BIRTH')" aria-label="DateOfBirth" v-model="issuables.credentials.VerifiableDiploma.credentialData.credentialSubject.dateOfBirth">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 2 ? disableInput(null) : enableInput(2)" href="#enable" :class="inputIndex === 2 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 2 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">{{$t('CLOSE')}}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="credentilModalVerifiableVaccinationCertificate" tabindex="-1" aria-labelledby="credentilModalVerifiableVaccinationCertificateLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{$t('EDIT_CREDENTIAL')}}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 0 ? false : true" type="text" :class="inputIndex === 0 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.FIRST_NAME')" aria-label="First name" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.givenNames">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 0 ? disableInput(null) : enableInput(0)" href="#enable" :class="inputIndex === 0 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 0 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 1 ? false : true" type="text" :class="inputIndex === 1 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.LAST_NAME')" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.familyName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 1 ? disableInput(null) : enableInput(1)" href="#enable" :class="inputIndex === 1 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 1 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-people"></i>
                              <input :disabled="inputIndex ===2 ? false : true" type="text" :class="inputIndex === 2 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.GENDER')" aria-label="Gender" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.personSex">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 2 ? disableInput(null) : enableInput(2)" href="#enable" :class="inputIndex === 2 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 2 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 3 ? false : true" type="text" :class="inputIndex === 3 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DATE_OF_BIRTH')" aria-label="DateOfBirth" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.dateOfBirth">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 3 ? disableInput(null) : enableInput(3)" href="#enable" :class="inputIndex === 3 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 3 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 4 ? false : true" type="text" :class="inputIndex === 4 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.VACCINE_OR_PROFYLAXIS')" aria-label="vaccineOrProphylaxis" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].vaccineOrProphylaxis">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 4 ? disableInput(null) : enableInput(4)" href="#enable" :class="inputIndex === 4 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 4 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 5 ? false : true" type="text" :class="inputIndex === 5 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.VACCINE_MEDICINAL_PRODUCT')" aria-label="vaccineMedicinalProduct" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].vaccineMedicinalProduct">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 5 ? disableInput(null) : enableInput(5)" href="#enable" :class="inputIndex === 5 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 5 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 6 ? false : true" type="text" :class="inputIndex === 6 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DOSE_NUMBER')" aria-label="doseNumber" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].doseNumber">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 6 ? disableInput(null) : enableInput(6)" href="#enable" :class="inputIndex === 6 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 6 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 7 ? false : true" type="text" :class="inputIndex === 7 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DATE_OF_VACCINATION')" aria-label="dateOfVaccination" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].dateOfVaccination">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 7 ? disableInput(null) : enableInput(7)" href="#enable" :class="inputIndex === 7 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 7 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 8 ? false : true" type="text" :class="inputIndex === 8 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.ADMINISTERING_CENTER')" aria-label="administeringCentre" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].administeringCentre">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 8 ? disableInput(null) : enableInput(8)" href="#enable" :class="inputIndex === 8 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 8 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 9 ? false : true" type="text" :class="inputIndex === 9 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.COUNTRY_OF_VACCINATION')" aria-label="countryOfVaccination" v-model="issuables.credentials.VerifiableVaccinationCertificate.credentialData.credentialSubject.vaccinationProphylaxisInformation[0].countryOfVaccination">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 9 ? disableInput(null) : enableInput(9)" href="#enable" :class="inputIndex === 9 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 9 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">{{$t('CLOSE')}}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal fade" id="credentilModalProofOfResidence" tabindex="-1" aria-labelledby="credentilModalVerifiableVaccinationCertificateLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{$t('EDIT_CREDENTIAL')}}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 0 ? false : true" type="text" :class="inputIndex === 0 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.LAST_NAME')" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.familyName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 0 ? disableInput(null) : enableInput(0)" href="#enable" :class="inputIndex === 0 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 0 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-card-text"></i>
                              <input :disabled="inputIndex === 1 ? false : true" type="text" :class="inputIndex === 1 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.FIRST_NAME')" aria-label="firstName" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.firstNames">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 1 ? disableInput(null) : enableInput(1)" href="#enable" :class="inputIndex === 1 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 1 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-people"></i>
                              <input :disabled="inputIndex ===2 ? false : true" type="text" :class="inputIndex === 2 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.GENDER')" aria-label="Gender" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.gender">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 2 ? disableInput(null) : enableInput(2)" href="#enable" :class="inputIndex === 2 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 2 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 3 ? false : true" type="text" :class="inputIndex === 3 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.DATE_OF_BIRTH')" aria-label="DateOfBirth" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.dateOfBirth">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 3 ? disableInput(null) : enableInput(3)" href="#enable" :class="inputIndex === 3 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 3 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 4 ? false : true" type="text" :class="inputIndex === 4 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.STREET_ADDRESS')" aria-label="streetAddress" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.address.streetAddress">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 4 ? disableInput(null) : enableInput(4)" href="#enable" :class="inputIndex === 4 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 4 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 5 ? false : true" type="text" :class="inputIndex === 5 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.POSTAL_CODE')" aria-label="postalCode" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.address.postalCode">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 5 ? disableInput(null) : enableInput(5)" href="#enable" :class="inputIndex === 5 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 5 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 6 ? false : true" type="text" :class="inputIndex === 6 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.LOCALITY')" aria-label="locality" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.address.locality">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 6 ? disableInput(null) : enableInput(6)" href="#enable" :class="inputIndex === 6 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 6 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 7 ? false : true" type="text" :class="inputIndex === 7 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.COUNTRY_NAME')" aria-label="countryName" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.address.countryName">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 7 ? disableInput(null) : enableInput(7)" href="#enable" :class="inputIndex === 7 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 7 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 8 ? false : true" type="text" :class="inputIndex === 8 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.FAMILY_STATUS')" aria-label="familyStatus" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.familyStatus">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 8 ? disableInput(null) : enableInput(8)" href="#enable" :class="inputIndex === 8 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 8 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 9 ? false : true" type="text" :class="inputIndex === 9 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.IDENTIFICATION_NUMBER')" aria-label="identificationNumber" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.identificationNumber">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 9 ? disableInput(null) : enableInput(9)" href="#enable" :class="inputIndex === 9 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 9 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                        <div class="row _forms mb-3">
                          <div class="col-11">
                            <div class="right-inner-addon input-container">
                              <i class="bi bi-calendar2-event"></i>
                              <input :disabled="inputIndex === 10 ? false : true" type="text" :class="inputIndex === 10 ? 'form-control border-primary' : 'form-control'" :placeholder="$t('CREDENTIAL.NATIONALITY')" aria-label="nationality" v-model="issuables.credentials.ProofOfResidence.credentialData.credentialSubject.nationality">
                            </div>
                          </div>
                          <div class="col _edit-btn d-flex flex-column align-items-center justify-content-center text-start">
                            <a @click="inputIndex === 10 ? disableInput(null) : enableInput(10)" href="#enable" :class="inputIndex === 10 ? 'p-0 text-success fst-italic' : 'p-0 text-primary fst-italic' "><i :class="inputIndex === 10 ? 'bi bi-check-square' : 'bi bi-pencil-square'"></i></a>
                          </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="reset">{{$t('CLOSE')}}</button>
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
      inputIndex: null,
      btnLoading: false
    }
  },
  computed: {
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },

  async asyncData ({ $axios }) {
    const wallets = await $axios.$get('/issuer-api/wallets/list')
    const issuables = await $axios.$get('/issuer-api/credentials/listIssuables')
    return { wallets, issuables }
  },

  methods: {
    reset(){
      this.inputIndex=null
      console.log(this.issuables[0])
    },
    enableInput(index){
      this.inputIndex=index;
      this.btnDisabled=false;
    },
    disableInput(){
      this.inputIndex=null;
      this.btnDisabled=true;
    },
    async goToWallet (walletId) {
      this.btnLoading = true;
      console.log("Selected issuables:", this.checkedCredentials)
      let selectedIssuables = {
        credentials: this.checkedCredentials.reduce((agg, key) => { agg[key]=this.issuables.credentials[key]; return agg; }, {})
      }
      console.log("Selected issuables:", selectedIssuables)
      const walletUrl = await this.$axios.$post('/issuer-api/credentials/issuance/request', selectedIssuables, { params: {"walletId": walletId } })
      setTimeout(()=>{window.location = walletUrl}, 2000)
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
