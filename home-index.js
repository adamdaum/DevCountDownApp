Vue.component('countdown-clock', {
    template: `
    <div id="clockdiv">
    <div>
      <span class="days">{{days}}</span>
      <div class="smalltext">Days</div>
    </div>
    <div>
      <span class="hours">{{hours}}</span>
      <div class="smalltext">Hours</div>
    </div>
    <div>
      <span class="minutes">{{minutes}}</span>
      <div class="smalltext">Minutes</div>
    </div>
    <div>
      <span class="seconds">{{seconds}}</span>
      <div class="smalltext">Seconds</div>
    </div>
  </div>
    `,
    props: {
        eventtime: {
            type: String,
            required: false,
            default: moment().add(1, 'months').format()
        }
    },
    data() {
        return {
            days: '',
            hours: '',
            minutes: '',
            seconds: ''
        }
    },
    mounted: function () {

        this.initializeClock();

    },
    methods: {
        initializeClock: function () {

            this.updateClock();

            var timeinterval = setInterval(this.updateClock, 1000);

        },
        updateClock: function () {

            let t = this.getTimeRemaining(moment(this.eventtime));

            this.days = t.days;
            this.hours = ('0' + t.hours).slice(-2);
            this.minutes = ('0' + t.minutes).slice(-2);
            this.seconds = ('0' + t.seconds).slice(-2);

              if (t.total <= 0) {

                console.log("expired")
                this.expired = true;
                this.$emit('expired');

                clearInterval(timeinterval);
               
              }
        },
        getTimeRemaining: function (endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date());
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    }
});
