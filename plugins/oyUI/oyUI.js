import Vue from 'vue'
import oyModal from './base/oyModal.vue';
import oyInput from './base/oyInput.vue';
import oyButton from './base/oyButton.vue';
import oyCard from './base/oyCard.vue';
import oyAvatar from './base/oyAvatar.vue';

import oyPage from './page/oyPage.vue';
import oyPageHeader from './page/oyPageHeader.vue';
import oyPageBody from './page/oyPageBody.vue';

Vue.component('oy-modal', oyModal);
Vue.component('oy-button', oyButton);
Vue.component('oy-input', oyInput);
Vue.component('oy-card', oyCard);
Vue.component('oy-avatar', oyAvatar);

Vue.component('oy-page', oyPage);
Vue.component('oy-page-header', oyPageHeader);
Vue.component('oy-page-body', oyPageBody);


