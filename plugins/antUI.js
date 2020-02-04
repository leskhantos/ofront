import messageApi from 'ant-design-vue/lib/message/index';
import notificationsApi from 'ant-design-vue/lib/notification/index';
import antIcon from 'ant-design-vue/lib/icon/index';

import 'ant-design-vue/lib/message/style/index.css';
import 'ant-design-vue/lib/notification/style/index.css';
import 'ant-design-vue/lib/icon/style/index.css';

const ant = {
    message: messageApi,
    notification: notificationsApi,
};

export default {
    install (Vue, options) {
        Vue.prototype.$ant = ant;

        Vue.component('ant-icon', antIcon);
    }
}