<template>
    <div 
        class="d-flex justify-center align-center fill-height"
    >
        <v-card 
            class="flex xs8 sm7 md6 lg4 xl3 pa-5" elevation="5"
        >
            <v-card-title>
                Регистрация
            </v-card-title>
            <v-form>
                <v-text-field
                    label="First name"
                    v-model="isFirstName"
                    type="text"
                    :error-messages="getErrors('name', $v.isFirstName)"
                    @blur="$v.isFirstName.$touch()"
                    @click="cleanError"
                ></v-text-field>

                <v-text-field
                    label="Last name"
                    v-model="isLastName"
                    type="text"
                    :error-messages="getErrors('name', $v.isLastName)"
                    @blur="$v.isLastName.$touch()"
                    @click="cleanError"
                ></v-text-field>

                <v-text-field
                    label="Номер телефона"
                    v-model="isPhone"
                    v-mask="'+7 (###) ###-##-##'"
                    :error-messages="getErrors('phone', $v.isPhone)"
                    @blur="$v.isPhone.$touch()"
                    counter
                    @click="cleanError"
                ></v-text-field>

                <v-text-field
                    label="Password"
                    v-model.trim="isPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages="getErrors('password', $v.isPassword)"
                    @blur="$v.isPassword.$touch()"
                    @click:append="showPassword = !showPassword"
                    counter
                    @click="cleanError"
                ></v-text-field>

                <v-text-field
                    label="Password"
                    v-model.trim="isConfirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages="getErrors('confirmPassword', $v.isConfirmPassword)"
                    @blur="$v.isConfirmPassword.$touch()"
                    @click:append="showPassword = !showPassword"
                    counter
                    @click="cleanError"
                ></v-text-field>

                <!-- <v-file-input
                    accept="image/*"
                    label="Загрузить фото"
                    @click="cleanError"
                ></v-file-input> -->

                <span class="error-message"> {{ this.$store.getters.getServMessage }} </span>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="showBtn"
                        color="success"
                        class="mr-4 d-flex mb-6 pl-1 pr-1"
                        @click="registration"
                    >Отправить</v-btn>
                </v-card-actions>
       
                <router-link
                    link to="/login" 
                > 
                    Авторизация
                </router-link>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import validation from '@/mixins/validations.mixin.js'
import { required, minLength, maxLength, helpers, sameAs } from 'vuelidate/lib/validators'
import { letterСheck } from '@/utils/validators'
export default {
    name: 'Registration',
    mixins: [validation],

    validations: {
        isFirstName: {
            required,
            minLength: minLength(3),
            alpha: helpers.regex("alpha", letterСheck) // вынести
        },
        isLastName: {
            required,
            minLength: minLength(3),
            alpha: helpers.regex("alpha", letterСheck) // вынести
        },
        isPhone: {
            required,
            minLength: minLength(18)
        },
        isPassword: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(25)
        },
        isConfirmPassword: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(25),
            sameAs: sameAs( function() {
                return this.isPassword
            })
        }
    },

    methods: {
        registration() {
            if ( this.$v.$invalid ) {
                this.$v.$touch()
                return
            }

            const { isPassword: password, isFirstName: first_name, isLastName: last_name } = this
            const phone = this.formatingPhone()
            this.$store.dispatch('registration', { phone, password, first_name, last_name } )
        }
    }
        
}
</script>