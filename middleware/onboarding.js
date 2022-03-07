export default function (context) {
    if(context.route.query.access_token != null) {
        console.log('Getting user info for access token ...', context.route.query.access_token, context)
        return context.$auth.logout(/* .... */)
        .then(x =>  
            context.$auth.loginWith('localOnboarding', {headers: {
            "Authorization": "Bearer " + context.route.query.access_token
        }}))
        .then(async loginResponse => {
            console.log("Logged in", loginResponse)
            context.$auth.setUser(loginResponse.data)
        })
    }
}
  