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

            let timeinterval = setInterval(this.updateClock, 1000);

        },
        updateClock: function () {


            let t = this.getTimeRemaining(moment(this.eventtime));

            this.days = t.days;
            this.hours = ('0' + t.hours).slice(-2);
            this.minutes = ('0' + t.minutes).slice(-2);
            this.seconds = ('0' + t.seconds).slice(-2);

              if (t.total <= 0) {
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
})

// Vue.component('product', {
//     props: {
//         premium: {
//             type: Boolean,
//             required: true
//         }
//     },
//     template: `
//     <div class="product">
//     <div class="product-image">
//         <img v-bind:src="image">
//     </div>


//     <div class="product-info">

//         <h1>{{ title }}</h1>
//         <p v-if="inStock">In Stock</p>
//         <p v-else>Out of Stock</p>
//         <p> Shipping: {{ shipping}} </p>

//         <ul>
//             <li v-for="detail in details">{{ detail }}</li>
//         </ul>
//         <div v-for="(variant, index) in variants" 
//         :key="variant.variantid"
//         class="color-box"
//         :style="{ backgroundColor: variant.variantColor }"
//         @mouseover="updateProductImage(index)">

//         </div>

//         <button v-on:click="addToCart"
//         :disabled="!inStock"
//         :class="{ disabledButton: !inStock}">Add to Cart</button>



//     </div>


// </div>
//     `,
//     data() {
//         return {

//             brand: 'Vue Masterful',
//             product: 'Socks',
//             inStock: true,
//             selectedVariant: 0,
//             onSale: true,
//             details: ["80% cotton", "20% polyester", "Gender-neutral"],
//             variants: [{
//                     variantId: 1,
//                     variantColor: 'green',
//                     variantImage: './assets/vue-socks-green.jpeg'
//                 },
//                 {
//                     variantId: 2,
//                     variantColor: 'blue',
//                     variantImage: './assets/vue-socks-blue.jpeg'
//                 }
//             ]

//         }
//     },
//     methods: {
//         addToCart: function () {
//            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
//         },
//         updateProductImage: function (index) {
//             this.selectedVariant = index

//         }
//     },
//     computed: {
//         title() {

//             return this.brand + ' ' + this.product

//         },
//         image() {
//             return this.variants[this.selectedVariant].variantImage
//         },
//         inStock() {
//             return this.variants[this.selectedVariant].variantQuantity
//         },
//         shipping() {
//             if (this.premium) {
//                 return "Free"
//             } else {
//                 return "$2.99"
//             }

//         }

//     }
// });