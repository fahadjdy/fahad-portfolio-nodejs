import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import * as common from './utils/common.js';

const app = createApp(App); // first create app instance

app.config.globalProperties.$common = common; // now set global function access

app.use(router).mount('#app'); // finally mount
