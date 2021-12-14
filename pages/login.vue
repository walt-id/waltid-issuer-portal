<template>
  <section class="text-center login-body">
    <main class="form-signin">
     <form form action="" id="login-form" class="my-4" @submit.prevent="login">
    <img class="mb-4" src="../assets/myguichet.png" alt="" width="221">
      <h1 class="h3 mb-3 fw-normal">{{$t('SIGN_IN_MSG', { msg: 'MyGuichet' })}}</h1>
      <br />
      <div class="form-floating">
        <input
          type="email"
          id="floatingInput"
          class="form-control"
          autocomplete="off"
          name="email"
          v-model="email"
          :placeholder="$t('EMAIL_ADDRESS')"/>
        <label for="floatingInput">{{$t('EMAIL_ADDRESS')}}</label>
      </div>
      <div class="form-floating">
        <input
         type="password"
         class="form-control"
         id="floatingPassword"
         :placeholder="$t('PASSWORD')"
         name="password"
         autocomplete="off"
         v-model="password"/>
        <label for="floatingPassword">{{$t('PASSWORD')}}</label>
      </div>
      <div class="checkbox mb-3">
       <label>
         <input type="checkbox" value="remember-me"> {{$t('REMEMBER_ME')}}
       </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary _animation-fade" button type="submit" name="submit">{{$t('SIGN_IN')}}</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2021 <a
            href="#"
            v-for="locale in availableLocales"
            :key="locale.code"
            @click.prevent.stop="$i18n.setLocale(locale.code)">{{ locale.code }} | </a></p>
     </form>
    </main>
  </section>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  computed: {
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async login () {
      try {
        const loginResponse = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$auth.setUser(loginResponse.data)
        this.$router.push("/dashboard")
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style scoped>
  .login-body {
    height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: white;

  }
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-floating:focus-within {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }
</style>
