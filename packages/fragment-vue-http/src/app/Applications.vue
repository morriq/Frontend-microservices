<template>
    <div id="poc-vue-test">
        <div class="recommendation" v-for="application in applications"
            :key="recommendation.ApplicationId"
             @click="test(recommendation.ApplicationId)"
        >
            <h3>{{ application.JobTitle}}</h3>
            <p>{{ application.Employer }}</p>
            <p>{{ application.Workplace}}</p>

            <br/>
            <br/>
            <br/>

            <p>{{application.OfferUrl}}</p>
        </div>
    </div>
</template>

<script>
    export default {
    	methods: {
    	    test(id) {
    	    	alert(id);
            }
        },

    	computed: {
        	applications() {
        		return this.$store.state.items;
            }
        }
    }
</script>

<style scoped>

    #poc-vue-test {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
    }

    .recommendation {
        width: 250px;
        padding: 10px;
        margin: 10px;
        box-shadow: 0 0 10px black;
    }


</style>
