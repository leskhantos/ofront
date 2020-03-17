<template>
  <div class="book">
    <div class="page" id="printTable">
        <div class="d-flex flex-wrap">
            <div v-for="voucher in  vouchers" class="card" style="width: 11.13rem;" :key="voucher.id">
              <div class="card-body">
                <h6 class="card-title font-weight-bold">ID:{{voucher.id}}</h6>
                <p class="card-text d-flex justify-content-center">ВАШ КОД для WI-FI</p>
                <h5 class="d-flex justify-content-center card-subtitle align-center font-weight-bold">
                  {{voucher.code}}
                </h5>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { Printd } from 'printd'

  export default {
        name: "printPage",
      computed: {
          vouchers: function () {
            return this.$store.getters['voucher/vouchersToPrint']
          }
      },
      created(){
        this.$store.dispatch('voucher/getPrintVouchers', 1);
      },
    methods: {

    },
      mounted() {
        const { Printd } = window.printd
        this.d = new Printd()
        const styles = [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
          ` .card{
    border-radius: 0;
    border: 1px solid;
  }
  h6{
    font-size: 12px;
    margin-bottom: 0.3rem !important;
  }
  .card-text{
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
  .card-body{
    padding:.3rem;
  }
  .card-subtitle{
    font-size: 30px;
    color: #000000
  }
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #FAFAFA;
    font: 12pt "Tahoma";
  }
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 10mm;
    margin: 10mm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }


  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }`
        ]
        const el = document.getElementById('printTable')
        this.d.print( el, styles)
      }
    }
</script>

<style lang="scss" scoped>
  .card{
    border-radius: 0;
    border: 1px solid;
  }
  h6{
    font-size: 12px;
    margin-bottom: 0.3rem !important;
  }
  .card-text{
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
  .card-body{
    padding:.3rem;
  }
  .card-subtitle{
    font-size: 30px;
    color: #000000
  }
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #FAFAFA;
    font: 12pt "Tahoma";
  }
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 10mm;
    margin: 10mm auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }


  @page {
    size: A4;
    margin: 0;
  }
  @media print {
    html, body {
      width: 210mm;
      height: 297mm;
    }
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }
</style>
