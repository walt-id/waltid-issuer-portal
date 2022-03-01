export default function (context) {
    if(!context.store.state.auth.loggedIn && context.route.query.access_token != null) {
        console.log('Getting user info for access token ...', context.route.query.access_token)
        return context.$axios.$get('/onboarding-api/auth/userToken', {headers: {
            "Authorization": "Bearer " + context.route.query.access_token
        }}).then(userInfo => { 
            context.$auth.setUser(userInfo)
        })
    }
}
  