import Vue from 'vue'
import oyModal from './base/oyModal.vue';
import oyInput from './base/oyInput.vue';
import oyButton from './base/oyButton.vue';
import oyCard from './base/oyCard.vue';
import oyAvatar from './base/oyAvatar.vue';
import oySelect from "./base/oySelect";
import oyPage from './page/oyPage.vue';
import oyPageHeader from './page/oyPageHeader.vue';
import oyPageBody from './page/oyPageBody.vue';
import oyDot from "./base/oyDot";
import oySwitch from "./base/oySwitch";

Vue.component('oy-modal', oyModal);
Vue.component('oy-button', oyButton);
Vue.component('oy-input', oyInput);
Vue.component('oy-card', oyCard);
Vue.component('oy-avatar', oyAvatar);
Vue.component('oy-select', oySelect);
Vue.component('oy-dot', oyDot);
Vue.component('oy-switch', oySwitch);

Vue.component('oy-page', oyPage);
Vue.component('oy-page-header', oyPageHeader);
Vue.component('oy-page-body', oyPageBody);


