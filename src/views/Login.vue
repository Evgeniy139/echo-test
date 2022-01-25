<template>
    <div 
        class="d-flex justify-center align-center fill-height"
    >
        <v-card 
            class="flex xs8 sm7 md6 lg4 xl3 pa-5" 
            elevation="5"
        >
            <v-card-title>
                Авторизация
            </v-card-title>

            <v-form
                v-on:submit.prevent
            >
                <v-text-field
                    v-model="isPhone"
                    label="Номер телефона"
                    v-mask="'+7 (###) ###-##-##'"
                    :error-messages="getErrors('phone', $v.isPhone)"
                    @blur="$v.isPhone.$touch()"
                    @click="cleanError"
                    counter
                ></v-text-field>

                <v-text-field
                    label="Password"
                    v-model="isPassword"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages="getErrors('password', $v.isPassword)"
                    @blur="$v.isPassword.$touch()"
                    @click:append="showPassword = !showPassword"
                    @click="cleanError"
                    counter
                ></v-text-field>

                <span class="error-message"> {{ this.$store.getters.getServMessage }} </span>

                <v-card-actions>
                    <v-checkbox
                        label="Запомнить меня"
                        v-model="saveAuth"
                    ></v-checkbox>

                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        class="mr-4 d-flex mb-6 pl-1 pr-1"
                        :disabled="showBtn"
                        @click.prevent="onLogin"
                    >Login</v-btn>
                </v-card-actions>

                <router-link
                    class="text-wrap"
                    link to="/forgot-password" 
                    > 
                        Забыли пароль ?
                </router-link>        
                <router-link
                    link to="/registration" 
                > 
                    <P> Регистрация </p>
                </router-link>
            </v-form>
        </v-card>
    </div>
</template>

<script>

import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import validation from '@/mixins/validations.mixin.js'

export default {
    name: 'Login',
    mixins: [validation],

    validations: {
        isPhone: {
            required,
            minLength: minLength(18)
        },

        isPassword: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(25)
        }
    },

    data() {
        return {
            saveAuth: true
        }
    },

    methods: {
        onLogin() {
            if ( this.$v.$invalid ) {
                this.$v.$touch()
                return
            }
            const { isPassword: password, saveAuth } = this

            const phone = this.formatingPhone()
            this.$store.dispatch('authLogin', { phone, password, saveAuth } )
        }
    }
}
</script>
