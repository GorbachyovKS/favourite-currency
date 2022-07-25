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
        <a-layout-content class="layout"
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <div v-if="selectedKeys1[0] === '1'" class="currency">
            <div v-if="currencyFavorite.length">
              <h3>Курс валют на дату: {{dateCurrency}}</h3>
              <div class="description">
                <div>Валюта</div>
                <div>Курс по отношению к бел. рублю</div>
                <div>Аббревиатура</div>
                <div class="void"></div>
              </div>
            </div>
            <h3 v-if="!currencyFavorite.length">Вы ещё не добавили не одну валюту в избранные</h3>
            <div v-for="item in currencyFavorite" :key="item.id" class="currencyItem">
                <div><router-link class="CurrName" :to="{name: 'detailedInformationPage', params: {item: JSON.stringify(item)}}">{{item.Cur_Name}}<sup>{{item.Cur_Scale === 1? '': item.Cur_Scale}}</sup></router-link></div>
                <div>{{item.Cur_OfficialRate}}</div>
                <div><b>{{item.Cur_Abbreviation}}</b></div>
                <div><button class="btn" @click="deleteCurrency(item)">
                <i class="fa-solid fa-minus"></i>
                </button></div>
            </div>
          </div>
          <div v-if="selectedKeys1[0] === '2'" class="currency">
          <div v-if="currency.length">
                <h3>Курс валют на дату: {{dateCurrency}}</h3>
                <div class="description">
                  <div>Валюта</div>
                  <div>Курс по отношению к бел. рублю</div>
                  <div>Аббревиатура</div>
                  <div class="void"></div>
                </div>
            </div>
            <h3 v-if="!currency.length">Все валюты добавлены в избранное</h3>
              
              <div v-for="item in currency" :key="item.id" class="currencyItem" >
                <div>{{item.Cur_Name}}<sup>{{item.Cur_Scale === 1? '': item.Cur_Scale}}</sup></div>
                <div>{{item.Cur_OfficialRate}}</div>
                <div><b>{{item.Cur_Abbreviation}}</b></div>
                <div><button class="btn" @click="addCurrency(item)">
                <i class="fa-solid fa-plus"></i></button></div>
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
      currency: [],
      dateCurrency: '',
    }
  },
  methods: {
    async fetchСurrency() {
      try {
        const response = await axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0');
        this.currency = response.data
        this.dateCurrency = response.data[0].Date.slice(0,10)
        if (this.currencyFavorite.length && this.currencyFavorite.length !== this.currency.length) {
          let result = []
          this.currency.forEach(x => {
            let bool;
            this.currencyFavorite.forEach(y => {
              if (y.Cur_ID === x.Cur_ID) {
                bool = true
              }
            })
            if (!bool) {
              result.push(x)
            }
          })
          this.currency = result
        } else if (this.currencyFavorite.length === this.currency.length) {
          this.currency.length = 0
        }
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
    this.currencyFavorite = JSON.parse(localStorage.getItem('checked')) || []
    this.fetchСurrency();
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

.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.site-layout-background {
  background: #fff;
}

.description,
.currencyItem {
  display: flex;
  gap: 20px;
  flex-grow: 1;
}

.description div,
.currencyItem div {
  max-width: 250px;
  width: 100%;
}



.currency {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.description {
  display: flex;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1890ff;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
}

.fa-solid {
  color: white;
}

.CurrName {
  cursor: pointer;
}
</style>