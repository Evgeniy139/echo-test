<template>
    <div 
        class="d-flex justify-center align-center fill-height"
    >
        <v-card
            class="flex xs8 sm7 md6 lg4 xl3 pa-5"
            elevation="5"
        >
            <v-card-title>
                Восстановление пароля
            </v-card-title>
            <span 
                class="error-message"
            > 
                {{ getServMessage }} 
            </span>
            <v-form>
                <v-text-field
                    label="Номер телефона"
                    v-model="isPhone"
                    v-mask="'+7 (###) ###-##-##'"
                    :error-messages="getErrors('phone', $v.isPhone)"
                    @blur="$v.isPhone.$touch()"
                    @click="cleanError"
                    counter
                ></v-text-field>

                <div v-if="smsInputShow">
                    <v-text-field
                        label="New password"
                        v-model="isPassword"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :error-messages="getErrors('password', $v.isPassword)"
                        @click="cleanError"
                        @blur="$v.password.$touch()"
                        @click:append="showPassword = !showPassword"
                        counter
                    ></v-text-field>

                    <h3> Введите смс </h3>

                    <v-otp-input
                        class="input-sms"
                        label="Введите смс"
                        length="4"
                        v-model="isSms"
                        :error-messages="getErrors('sms', $v.isSms)"
                        @blur="$v.isSms.$touch()"
                        @click="cleanError"
                        plain
                    ></v-otp-input>

                    <span
                        v-if="time !== '00'"
                    >
                        Отправить повторно, через {{ time }} сек.
                    </span>

                    <v-btn v-else
                        x-small
                        color="blue"
                        dark
                        @click="forgotStart()"
                    >
                        Отправить повторно
                    </v-btn>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        class="mr-4 d-flex mb-6 pl-1 pr-1"
                        @click="getAuthSms ? forgotEnd() : forgotStart()"
                    >
                        Отправить
                    </v-btn>
                </v-card-actions>

                <router-link
                    link to="/login"
                >
                    Вспомнил пароль !
                </router-link>
            
                <router-link
                    link to="/registration"
                >
                    <p> Регистрация </p>
                </router-link>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import validation from '@/mixins/validations.mixin'
import { mapGetters, mapMutations } from 'vuex'
import timer from '@/mixins/timer.mixin'
import { required, minLength,  maxLength, helpers } from 'vuelidate/lib/validators'
import { letterСheck } from '@/utils/validators'

export default {
    name: 'ForgotPassword',
    mixins: [
        validation,
        timer
    ],

    validations: {
        isPhone: {
            required,
            minLength: minLength(18),
        },
        
        isPassword: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(25)
        },

        isSms: {
            required,
            minLength: minLength(4),
            alpha: helpers.regex("alpha", letterСheck)
        }
    },

    data: () => ({
        isSms: ''
    }),

    computed: {
        ...mapGetters( [ 'getAuthSuccess', 'getServMessage', 'getAuthSms' ] ),
        ...mapMutations( ['cleanAuthSms'] ),

        smsInputShow() {
            if ( this.getAuthSms || this.getAuthSuccess ) {
                this.startTimer()
                return true
            }
            return false
        }
    },

    methods: {
        forgotStart() {
            if ( this.$v.isPhone.$invalid ) {
                this.$v.isPhone.$touch()
                return 
            }

            const phone = this.formatingPhone()
            this.$store.dispatch('forgotStart', { phone } )
        },

        forgotEnd() {
            if ( this.$v.$invalid ) {
                this.$v.$touch()
                return 
            }

            const phone = this.formatingPhone()
            const { isPassword: password, isSms: code } = this
            this.$store.dispatch('forgotEnd', { phone, password, code } )
        }
    },

    created() {
        this.cleanAuthSms
    }

}
</script>
