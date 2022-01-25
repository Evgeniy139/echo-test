<template>
    <v-container>
        <h3> Здравствуйте, {{ getUser.first_name }} {{ getUser.last_name }} ! </h3>

        <v-card
            elevation="0"
            class="d-flex justify-center pa-10"
        >
            <v-btn
                class="pa-3"
                color="success"
                @click="logout"
            > 
                Выйти
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'PersonalCabinet',

    data: () => ({
    }),

    computed: {
       ...mapGetters( [ 'getUser' ] ),
    },

    methods: {
        logout() {
            this.$store.dispatch('authLogout')
        }
    },

    created() {
        this.$store.dispatch('getUser')    
    }
}
</script>
