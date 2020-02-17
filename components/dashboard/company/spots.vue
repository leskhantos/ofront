<template>
  <oy-page>
    <oy-page-header title="Зоны">
      <div slot="actions">
        <oy-button
          title="Добавить зону"
          type="success"
          icon="icon-plus"
          @click="showModal"
        >+</oy-button>
        <oy-modal
          title="Добавить зону"
          padding="1rem"
          :visible="set_new_spot"
          @close="set_new_spot = false"
        >
          <storeSpot :company_id="company_id"/>
        </oy-modal>
      </div>
    </oy-page-header>
    <oy-page-body :style="{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Зона</th>
          <th scope="col">Страница</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="spot in spots" :key="spot.id">
          <th scope="row">{{ spot.id }}</th>
          <td>{{ spot.address }}</td>
          <td>{{ spot.page_id }}</td>
          <td><span class="dot"></span></td>
        </tr>
        </tbody>
      </table>
    </oy-page-body>
  </oy-page>
</template>

<script>
  import storeSpot from "./storeSpot";
    export default {
      components:{storeSpot},
      props:{
        name: {
          type:String,
          required: false
        },
        company_id:{
          type: Number,
          required: false
        }
      },
      methods:{
        showModal(){
          console.log(this.$store.getters['app/set_new_spot'])
          return  this.set_new_spot = true;
        },
      },
      computed:{
        spots:function () {
          return this.$store.getters['company/spots']
        },
        set_new_spot: {
          get: function() {
            return this.$store.getters['app/set_new_spot'];
          },
          set: function (value) {
            this.$store.commit('app/SET_NEW_SPOT', value);
          }
        },
      },
      mounted() {
        this.$store.dispatch('company/getSpots', this.company_id)
      },
      watch:{
        company_id:function () {
          this.$store.dispatch('company/getSpots', this.company_id)
        }
      }
    }
</script>

<style scoped>
.dot{
  height: 25px;
  width: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
</style>
