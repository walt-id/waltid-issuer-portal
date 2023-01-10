<template>
    <div style="position: absolute; width: 100%;" :class="this.isShown === true ? 'navbar navbar-expand-lg bg-primary _notice _fadeInDown': 'hide'">
        <div class="container-fluid">
          <div class="d-flex col-12">
            <div class="col"></div>
            <div class="col-10 text-center text-white d-flex align-items-center justify-content-center">
                <p><img height="25px" :src="this.logo.path" :alt="this.logo.alt" class="mx-2" /><strong>Notice:</strong> In practice, Issuer Portals are hosted by Issuers. They enable users (Holders) to request their data from an Issuer (as Verifiable Credential).</p>
            </div>
            <div class="col text-white d-flex justify-content-end align-items-center" style="cursor: pointer">
                <a @click="hideNotice">
                    <i class="bi bi-x-lg"></i>
                </a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {config} from '/config.js'
export default {
    name: "Notice",
    data (){
        return{
            copyright: config.copyright,
            logo: config.whiteLogo,
            isShown: true
        }
    },
    methods:{
        hideNotice (){
            this.isShown = false
        }
    }

}
</script>
