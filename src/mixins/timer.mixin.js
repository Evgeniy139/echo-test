export default {
    data: () => ({
        timer: 0,
        seconds: 20,
        currentTime: ''
    }),

    computed: {
        time() {
            let getSeconds = this.seconds < 10 ? '0' +this.seconds : this.seconds
            if ( this.seconds === 0 ) this.clearTime()

            return this.currentTime = `${ getSeconds }`
        }
    },

    methods: {
        startTimer() {
            this.timer = setInterval( () => { this.seconds-- }, 1000)
        },

        stopTimer() {
            clearTimeout( this.timer )
        },

        clearTime() {
            this.stopTimer(),
            this.seconds = 20
        },

        getCurrentTime() {
            return this.seconds
        }
    },

    destroyed() {
        this.stopTimer()
    }
}
