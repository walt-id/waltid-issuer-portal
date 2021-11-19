<template>
  <section class="text-center login-body">
    <main class="form-signin">
     <form form action="" id="login-form" class="my-4" @submit.prevent="login">
      <img class="mb-4" src="https://static.intercomassets.com/avatars/5059525/square_128/custom_avatar-1628056261.png?1628056261" alt="" width="72">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <div class="form-floating">
        <input
          type="email"
          id="floatingInput"
          class="form-control"
          autocomplete="off"
          name="email"
          v-model="email"
          placeholder="E-mail"/>
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
         type="password"
         class="form-control"
         id="floatingPassword"
         placeholder="Password"
         name="password"
         autocomplete="off"
         v-model="password"/>
        <label for="floatingPassword">Password</label>
      </div>
      <div class="checkbox mb-3">
       <label>
         <input type="checkbox" value="remember-me"> Remember me
       </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary _animation-fade" button type="submit" name="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
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
