import { validationMixin } from 'vuelidate'

export default {
    mixins: [validationMixin],

    data: () => ({
        showPassword: false,
        showBtn: false
    }),

    computed: {
        isPhone: {
            get() {
                return this.$store.getters.getPhone
            },
            set(phone) {
                this.$store.commit("updatePhone", phone)
            }
        },

        isPassword: {
            get() {
                return this.$store.getters.getPassword
            },
            set(password) {
                this.$store.commit("updatePassword", password)
            }
        },

        isConfirmPassword: {
            get() {
                return this.$store.getters.getConfirmPassword
            },
            set(password) {
                this.$store.commit("updateConfirmPassword", password)
            }
        },

        isFirstName: {
            get() {
                return this.$store.getters.getFirstName
            },
            set(name) {
                this.$store.commit("updateFirstName", name)
            }
        },

        isLastName: {
            get() {
                return this.$store.getters.getLastName
            },
            set(name) {
                this.$store.commit("updateLastName", name)
            }
        }
    },

    methods: {
        getErrors(name, model) {
            const errors = []
            if (!model.$dirty) return errors
            switch (name) {
                case "password":
                    !model.minLength && errors.push("Password must be at least 8 characters long")
                    !model.maxLength && errors.push("The password must be no more than 25 characters long.")
                    !model.required && errors.push("Password is required")
                    break
                case "confirmPassword":
                    !model.minLength && errors.push("Password must be at least 8 characters long")
                    !model.maxLength && errors.push("The password must be no more than 25 characters long.")
                    !model.required && errors.push("Password is required")
                    !model.sameAs && errors.push("Password mismatch")
                    break
                case "name":
                    !model.alpha && errors.push("The name must be composed of characters")
                    !model.minLength && errors.push("Name must be at least 3 characters long")
                    !model.required && errors.push("Name is required")
                    break
                case "phone":
                    !model.minLength && errors.push("Phone must be at least 18 characters long")
                    !model.required && errors.push("Phone is required")
                    break
                case "sms":
                    !model.alpha && errors.push("The name must be composed of numbers")
                    !model.minLength && errors.push("Sms must be at least 4 numbers long")
                    !model.required && errors.push("Sms is required")
                    break

                default:
                    break
                }

            return errors
        },

        cleanError() {
            this.$store.commit('cleanAuthMessage')
        },

        formatingPhone() {
            const phone = this.isPhone.replace(/[() + -]/g, "")
            return phone
        }
    },

    beforeCreate() { 
        if (localStorage.getItem('fieldsForm')) this.$store.commit('initialiseStore')
        this.$store.commit('updateAuth', {})
    }
}
