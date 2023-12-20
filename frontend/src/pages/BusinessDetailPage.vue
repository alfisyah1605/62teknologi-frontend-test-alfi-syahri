<template>
    <div class="home-page">
        <PrimeButton label="Go Back" icon="pi pi-chevron-left" @click="goBack()" />

        <h1>Business Detail</h1>
        <!-- <div class="filter-container">
            <div class="p-input-icon-left">
                <i class="pi pi-search" />
                <PrimeInputText type="text" @input="handleSearchUpdate()" v-model="filter.searchTerms" placeholder="Enter keywords to search"/>
            </div>

            <PrimeMultiSelect v-model="selectedCategories" display="chip" :options="categories" optionLabel="name" placeholder="Select Categories" class="w-full"/>
        </div> -->
        <PrimeDivider />
        
        <div class="list-container">
            <v-container v-if="!loading">
                <div class="business-listing">
                    <div class="business-image" :style="{backgroundImage: 'url(' + business.image_url + ')'}"></div>
                    <div class="business-details">
                        <h2 class="business-name">{{ business.name }}</h2>
                        <div class="flex gap-1">
                            <PrimeTag icon="pi pi-wallet" :value="business.price"></PrimeTag>
                            <PrimeRating v-model="business.rating" readonly :cancel="false" />
                        </div>

                        <p class="business-description">A brief description of the business and its specialties.</p>
                        <p class="business-location">Location: {{ business.location?.address1 + ", "+business.location?.city }}</p>

                        <div class="flex gap-1">
                            <PrimeTag rounded v-for="category in business.categories" icon="pi pi-tag" severity="warning" :value="category.title" :key="category.alias"></PrimeTag>
                        </div>
                    </div>
                </div>

                <PrimeDivider></PrimeDivider>
                <PrimeButton label="See on Google Maps" severity="info" @click="openGoogleMaps()"/>
                <PrimeDivider></PrimeDivider>
                <!-- Gallery -->
                <PrimeGalleria :value="business.photos" :numVisible="5" containerStyle="max-width: 100%"
                    :showThumbnails="false" :showIndicators="true">
                    <template #item="slotProps">
                        <img :src="slotProps.item" style="width: 100%; display: block" />
                    </template>
                </PrimeGalleria>

                <PrimeDivider></PrimeDivider>
                <h2>Reviews</h2>
                <div class="business-listing" v-for="(review, index) in reviews" :key="index">
                    <div class="business-image" :style="{backgroundImage: 'url(' + review.user.image_url + ')', width: '150px'}"></div>
                    <div class="business-details">
                        <PrimeRating v-model="review.rating" readonly :cancel="false" />
                        <h2 class="business-name" style="margin-top: 15px">{{ review.user.name }}</h2>
                        <PrimeTag icon="pi pi-clock" :value="review.time_created"></PrimeTag>

                        <p class="business-description">{{ review.text }}</p>
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

    </div>
</template>


<script>
import YelpService from '../YelpService';

export default {
    name: 'BusinessDetailPage',
    props: {
        alias: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            business: {},
            reviews: []
        };
    },
    methods: {
        async getBusinessDetail() {
            this.loading = true;
            try {
                const response = await YelpService.getBusinessDetail(this.alias);
                const data = response.data;

                this.business = data;
                this.getBusinessReviews();
                this.loading = false;
            } catch (error) {
                console.error('Error fetching data from Yelp API', error);
            }
        },

        async getBusinessReviews() {
            try {
                const response = await YelpService.getBusinessReviews(this.alias);
                const data = response.data;
                this.reviews = data.reviews;
            } catch (error) {
                console.error('Error fetching data from Yelp API', error);
            }
        },
        openGoogleMaps() {
            window.open(`https://www.google.com/maps?q=${this.business.coordinates.latitude},${this.business.coordinates.longitude}`, '_blank');
        },

        goBack() {
            this.$router.push({ name: 'home' });
        }
    },

  mounted() {
    // `https://www.google.com/maps?q=${latitude},${longitude}`;
    this.getBusinessDetail();
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
