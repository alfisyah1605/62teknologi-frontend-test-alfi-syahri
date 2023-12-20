<template>
    <div class="home-page">
        <h1>Business List</h1>
        <div class="filter-container">
            <div class="p-input-icon-left">
                <i class="pi pi-search" />
                <PrimeInputText type="text" @input="handleSearchUpdate()" v-model="filter.searchTerms" placeholder="Enter keywords to search"/>
            </div>

            <PrimeMultiSelect v-model="selectedCategories" display="chip" :options="categories" optionLabel="name" placeholder="Select Categories" class="w-full"/>
        </div>
        <PrimeDivider />
        
        <div class="list-container">
            <v-container v-if="!loading">
                <div class="business-listing" v-for="(business, index) in businesses" :key="index">
                    <div class="business-image" :style="{backgroundImage: 'url(' + business.image_url + ')'}"></div>
                    <div class="business-details">
                        <h2 class="business-name">
                            <router-link :to="{ name: 'business-detail', params: { alias: business.alias } }">{{ business.name }}</router-link>
                        </h2>
                        <div class="flex gap-1">
                            <PrimeTag icon="pi pi-wallet" :value="business.price"></PrimeTag>
                            <PrimeRating v-model="business.rating" readonly :cancel="false" />
                        </div>

                        <p class="business-description">A brief description of the business and its specialties.</p>
                        <p class="business-location">Location: {{ business.location.address1 + ", "+business.location.city }}</p>

                        <div class="flex gap-1">
                            <PrimeTag rounded v-for="category in business.categories" icon="pi pi-tag" severity="warning" :value="category.title" :key="category.alias"></PrimeTag>
                        </div>
                    </div>
                </div>
            </v-container>

            <div class="skeleton" v-if="loading">
                <div class="flex mb-3">
                    <PrimeSkeleton shape="circle" size="4rem" class="mr-2"></PrimeSkeleton>
                    <div>
                        <PrimeSkeleton width="10rem" class="mb-2"></PrimeSkeleton>
                        <PrimeSkeleton width="5rem" class="mb-2"></PrimeSkeleton>
                        <PrimeSkeleton height=".5rem"></PrimeSkeleton>
                    </div>
                </div>

                <PrimeSkeleton width="100%" height="150px"></PrimeSkeleton>
                <div class="flex justify-content-between mt-3">
                    <PrimeSkeleton width="4rem" height="2rem" class="mr-2"></PrimeSkeleton>
                    <PrimeSkeleton width="4rem" height="2rem"></PrimeSkeleton>
                </div>
            </div>
        </div>

        <PrimePaginator v-model:first="firstDataOffset" :rows="dataPerPage" :totalRecords="totalData" v-if="!loading && totalData > dataPerPage" @input="handlePaginatorUpdate"></PrimePaginator>
    </div>
</template>


<script>
import YelpService from '../YelpService';

export default {
    name: 'HomePage',
    props: {
    },
    data() {
        return {
            loading: false,
            categories: [],
            businesses: [],
            filter: {
                searchTerms: '',
                location: 'NYC', // Set default to new york city
                selectedCategories: []
            },
            totalData: 0,
            dataPerPage: 20,
            firstDataOffset: 0,
            currentPage: 0,
            searchDebounceInterval: null
        };
    },
    watch: {
        // Watch for changes in paginator properties
        firstDataOffset(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.handlePaginatorUpdate();
            }
        },
    },
    methods: {
        handleSearchUpdate() {
            clearTimeout(this.searchDebounceInterval);
            this.searchDebounceInterval = setTimeout(() => {
                this.firstDataOffset = 0;
                this.getBusinesses();
            }, 1000);
        },
        /**
         * This api call is not able to execute due to error NOT_IN_DEVELOPER_BETA
         */
        async getCategories() {
            try {
                const response = await YelpService.getCategories();
                this.categories = response.data.categories;
                console.log(this.categories)
            } catch (error) {
                console.error('Error fetching data from Yelp API', error);
            }
        },

        async getBusinesses() {
            this.loading = true;
            try {
                const response = await YelpService.searchBusinesses({
                    term: this.filter.searchTerms,
                    location: this.filter.location,
                    offset: this.firstDataOffset,
                    limit: this.dataPerPage
                });
                const data = response.data;

                this.totalData = data.total;
                this.businesses = data.businesses;
                this.loading = false;
            } catch (error) {
                console.error('Error fetching data from Yelp API', error);
            }
        },

        handlePaginatorUpdate(event) {
            console.log(event);
            this.getBusinesses();
        }
    },

  mounted() {
    this.getBusinesses();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
.home-page {
    text-align: left;
}
.filter-container {
    width: 100%;
    gap: 20px;
    display: flex;
}

</style>
