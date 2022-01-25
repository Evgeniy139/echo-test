export default {
    state: {
        authFields: {
            phone: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        }
    },

    getters: {
        getPhone( state ) {
            return state.authFields.phone
        },

        getPassword( state ) {
            return state.authFields.password
        },

        getConfirmPassword( state ) {
            return state.authFields.confirmPassword
        },

        getFirstName( state ) {
            return state.authFields.firstName
        },

        getLastName( state ) {
            return state.authFields.lastName
        }
    },

    mutations: {
        initialiseStore( state ) {
            if (localStorage.getItem('fieldsForm')) state.authFields = JSON.parse( localStorage.fieldsForm )
        },

        updatePhone( state, phone ) {
            state.authFields.phone = phone
            localStorage.setItem('fieldsForm', JSON.stringify( state.authFields ) )
        },

        updatePassword( state, password ) {
            state.authFields.password = password
            localStorage.setItem('fieldsForm', JSON.stringify( state.authFields ) )
        },

        updateConfirmPassword( state, password ) {
            state.authFields.confirmPassword = password
            localStorage.setItem('fieldsForm', JSON.stringify( state.authFields ) )
        },

        updateFirstName( state, firstName ) {
            state.authFields.firstName = firstName
            localStorage.setItem('fieldsForm', JSON.stringify( state.authFields ) )
        },

        updateLastName( state, lastName ) {
            state.authFields.lastName = lastName
            localStorage.setItem('fieldsForm', JSON.stringify( state.authFields ) )
        }
    }

}