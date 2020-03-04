<template>
  <div class="row" :style="{ paddingBottom:'.5rem'}">
    <div class="col-md-2">
      <h5>{{ title }}:</h5>
    </div>
    <div class="col-md-10" >
      <div class="switch">
        <input class="switch" id="switch" name="switch" type="checkbox" v-model="val" :checked="val"
               @change="change()"
        />
        <label data-off="" data-on="" for="switch"></label>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        checked:{
          type: [Boolean,Number],
          required:false
        },
        title:{
          type: String,
          required: false
        }
      },
      data(){
        return{
          val: null
        }
      },
      methods:{
        change: function() {
          this.$emit('input', this.val);
        }
      },
      created() {
        this.val=this.checked
      }
    }
</script>

<style lang="scss" scoped>
  $gray: lightgray;
  $blue: #007bff;
  $height: 28px;
  $width: $height * 2;

  .switch input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  div.switch.float-right {
    margin-top: -15px;
  }

  .switch label {
    cursor: pointer;
    width: $width;
    height: $height;
    background: $gray;
    display: block;
    border-radius: $height / 4;
    position: relative;
    margin: -1.1em 0px 0px;
  }

  .switch label:before {
    content: attr(data-off);
    position: absolute;
    top: $height * .05;
    right: 0;
    font-size: $height * .3;
    padding: ($height / 4) ($height / 4);
    color: white;
  }

  .switch input:checked + label:before {
    content: attr(data-on);
    position: absolute;
    left: 0;
    font-size: $height * .3;
    padding-left: $height / 4;
    color: white;
  }

  .switch label:after {
    content: '';
    position: absolute;
    top: $height * .05;
    left: $height * .05;
    width: $height * .9;
    height: $height * .9;
    background: #fff;
    border-radius: $height / 5;
  }

  .switch input:checked + label {
    background: $blue;
  }

  .switch input:checked + label:after {
    transform: translateX($width - $height);
  }
</style>
