<template>
  <nav aria-label="..." class="text-xs-center">
    <ul class="pagination justify-content-center">
      <li :class="['page-item', {'disabled': pageNumber === 1}]">
        <a class="page-link"
           @click="$emit('prevPage', pageNumber)" href="#" ><span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pageCount" :class="['page-item',{'active':page.id===pageNumber}]" @click="$emit('page',page.id)"  :key="page.id">
        <a class="page-link" href="#">{{page.id}}</a>
      </li>
      <li :class="['page-item', {'disabled':pageNumber >= this.length}]">
        <a class="page-link"
           @click="$emit('nextPage', pageNumber)" href="#"><span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
    export default {
      props:{
        total:{
          type:Number,
          required:false
        },
        listData:{
          type:Array,
          required:false
        },
        size:{
          type:Number,
          required:false,
        },
        pageNumber:{
          type: Number,
          required:false,
        }
      },
      data(){
        return{
          length: ''
        }
      },
      computed:{
        pageCount(){
          let t = this.total,
            s = this.size;
          let arr = []
          let length =Math.ceil(t/s)
          for (let i = 1; i <= length; i++){
            arr.push({id: i});
          }
          this.length = length
          return arr;
        },
      },
    }
</script>

<style scoped>
  .pagination > li > a
  {
    background-color: white;
    color: #37a967;
  }

  .pagination > li > a:focus,
  .pagination > li > a:hover,
  .pagination > li > span:focus,
  .pagination > li > span:hover
  {
    color: #fff;
    background-color: gray;
    border-color: #ddd;
  }

  .pagination > .active > a
  {
    color: white;
    background-color: #37a967 !Important;
    border: solid 1px #37a967 !Important;
  }

  .pagination > .active > a:hover
  {
    background-color: #37a967 !Important;
    border: solid 1px #37a967;
  }
</style>
