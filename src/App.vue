<template>
  <a-layout style="height: 100%; display: block;">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">Избранные</a-menu-item>
        <a-menu-item key="2">Все валюты</a-menu-item>
       
      </a-menu>
    </a-layout-header>
    <a-layout style="min-height: none;">
      <a-layout style="padding: 0 24px 24px; margin: 16px 0;">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <div v-show="selectedKeys1[0] === '1'" class="currency">
          <div v-for="item in currencyFavorite" :key="item.id" class="currencyItem">
          <div>{{item.Date.slice(0,10)}}</div>
              <div>{{item.Cur_Name}}</div>
              <div>{{item.Cur_OfficialRate}}</div>
              <div><b>{{item.Cur_Abbreviation}}</b></div>
              <div>{{item.Cur_Scale}}</div>
              <div><button class="btn btnDel" @click="deleteCurrency(item)"></button></div>
          </div>
          </div>
          <div v-show="selectedKeys1[0] === '2'" class="currency">

            <div v-for="item in currency" :key="item.id" class="currencyItem" >
              <div>{{item.Date.slice(0,10)}}</div>
              <div>{{item.Cur_Name}}</div>
              <div>{{item.Cur_OfficialRate}}</div>
              <div><b>{{item.Cur_Abbreviation}}</b></div>
              <div>{{item.Cur_Scale}}</div>
              <div><button class="btn btnAdd" @click="addCurrency(item)"></button></div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios'
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },

  setup() {
    return {
      selectedKeys1: ref(['1']),
    };
  },
  data() {
    return {
      currencyFavorite: [],
      currency: []
    }
  },
  methods: {
    async fetchСurrency() {
      try {
        const response = await axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0');
        this.currency = response.data
      } catch (error) {
        console.log(error)
      }
    },
    addCurrency(event) {
      this.currencyFavorite.push(event)
      this.currency = this.currency.filter(item => item.Cur_ID !== event.Cur_ID)
    },
    deleteCurrency(event) {
      this.currency.push(event)
      this.currencyFavorite = this.currencyFavorite.filter(item => item.Cur_ID !== event.Cur_ID)
    
    }
  },
  mounted() {
    this.fetchСurrency();
    this.currencyFavorite = JSON.parse(localStorage.getItem('checked')) || []
  },
  watch: {
    currencyFavorite: {
      handler(n, o) {
        localStorage.setItem("checked", JSON.stringify(n));
      },
      deep: true
    }
  }
});
</script>
<style scoped>
*{
  box-sizing: border-box;
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

.currencyItem {
  display: flex;
  gap: 20px;
}

.currencyItem div {
  width: 100px;
}

.currency {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn {
  display: flex;
  background-color: #1890ff;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  position: relative;
}


.btnAdd::before,
.btnDel::before {
  content: '';
  position: absolute;
  width: 12.5px;
  top: 10px;
  left: 6.5px;
  border-bottom: 2.5px solid white;
}


.btnAdd::after {
  content: '';
  position: absolute;
  height: 12.5px;
  left: 11px;
  top: 5.5px;
  border-left: 2.5px solid white;
}
</style>