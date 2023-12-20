import { createApp } from 'vue'
import App from './App.vue';

// Import Router
import router from './routes';

// Import PrimeVue
import PrimeVue from 'primevue/config';
// Import PriveVue's Components
import Button from "primevue/button";
import Tag from "primevue/tag";
import Rating from "primevue/rating";
import Divider from "primevue/divider";
import InputText from 'primevue/inputtext';
import Paginator from 'primevue/paginator';
import MultiSelect from 'primevue/multiselect';
import Skeleton from 'primevue/skeleton';
import Galleria from 'primevue/galleria';
import Breadcrumb from 'primevue/breadcrumb';

import '@/assets/css/styles.scss';

const app = createApp(App)

app.use(router);
app.use(PrimeVue);

// Register PrimeVue's components
app.component('PrimeButton', Button);
app.component('PrimeTag', Tag);
app.component('PrimeRating', Rating);
app.component('PrimeDivider', Divider);
app.component('PrimeInputText', InputText);
app.component('PrimePaginator', Paginator);
app.component('PrimeMultiSelect', MultiSelect);
app.component('PrimeSkeleton', Skeleton);
app.component('PrimeGalleria', Galleria);
app.component('PrimeBreadcrumb', Breadcrumb);

app.mount('#app');
