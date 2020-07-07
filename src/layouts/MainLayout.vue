<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-white text-white">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="q-pt-sm">
          <router-link to="/">
            <div style="width: 20%">
              <img style="border-radius: 10px;width: 100%"
                   src="../statics/logo.png" alt=""/>
            </div>
          </router-link>
        </q-toolbar-title>

        <q-btn-group class="q-mr-xs" unelevated>
          <a href="/" class="header__icon-link">
            <q-btn
              class="header__list-icon"
              :ripple="false"
              no-caps stack unelevated
            >
              <span class="header__icon"><q-icon name="search" color="blue-10"></q-icon></span>
              <div class="header__icon-text">Find ticket</div>
            </q-btn>
          </a>
          <a href="/" class="header__icon-link">
            <q-btn
              class="header__list-icon"
              :ripple="false"
              no-caps stack unelevated
            >
              <span class="header__icon"><q-icon name="event_seat" color="blue-10"></q-icon></span>
              <div class="header__icon-text">Seat information</div>
            </q-btn>
          </a>
          <a href="/" class="header__icon-link">
            <q-btn
              class="header__list-icon"
              :ripple="false"
              no-caps stack unelevated
            >
              <span class="header__icon"><q-icon name="redeem" color="blue-10"></q-icon></span>
              <div class="header__icon-text">Promotions</div>
            </q-btn>
          </a>
          <a href="/" class="header__icon-link">
            <q-btn
              class="header__list-icon"
              :ripple="false"
              no-caps stack unelevated
            >
              <span class="header__icon"><q-icon name="content_paste" color="blue-10"></q-icon></span>
              <div class="header__icon-text">Regulations</div>
            </q-btn>
          </a>
          <a href="/" class="header__icon-link">
            <q-btn
              class="header__list-icon"
              :ripple="false"
              no-caps stack unelevated
            >
              <span class="header__icon"><q-icon name="contacts" color="blue-10"></q-icon></span>
              <div class="header__icon-text">Contacts</div>
            </q-btn>
          </a>
          <q-btn
            class="header__list-icon"
            :ripple="false"
            no-caps stack unelevated
            @click="cart = true"
          >
            <span class="header__icon"><q-icon name="shopping_cart" color="blue-10"></q-icon></span>
            <div class="header__icon-text">Your cart</div>
          </q-btn>
        </q-btn-group>

      </q-toolbar>
    </q-header>

    <q-dialog v-model="cart">
      <q-card bordered style="width: 700px; max-width: 80vw;">
        <q-item>
          <q-item-section side>
            <q-icon name="shopping_cart" size="md" color="blue-9"/>
          </q-item-section>

          <q-item-section class="text-bold text-blue-9">
            Your cart
          </q-item-section>

          <q-item-section side class="text-bold text-blue-9">
            <q-btn to="payment" label="Buy ticket" color="blue-8"/>
          </q-item-section>
        </q-item>

        <q-separator/>

        <q-card-section>
          <q-list>

            <q-item>
              <q-item-section>
                <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                <q-item-label>11/07/2020 06:10</q-item-label>
                <q-item-label>NML coach 1 seat 56</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
              </q-item-section>
            </q-item>

            <q-separator inset=""/>

            <q-item>
              <q-item-section>
                <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                <q-item-label>11/07/2020 06:10</q-item-label>
                <q-item-label>NML coach 1 seat 56</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
              </q-item-section>
            </q-item>

            <q-separator inset=""/>

            <q-item>
              <q-item-section>
                <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                <q-item-label>11/07/2020 06:10</q-item-label>
                <q-item-label>NML coach 1 seat 56</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
              </q-item-section>
            </q-item>

            <q-separator inset=""/>

            <q-item>
              <q-item-section>
                <q-item-label>LP2 Hải Phòng-Hà Nội</q-item-label>
                <q-item-label>11/07/2020 06:10</q-item-label>
                <q-item-label>NML coach 1 seat 56</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn dense flat unelevated icon="delete_outline" color="blue-10" size="lg"/>
              </q-item-section>
            </q-item>

          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer bordered class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="text-grey text-center text-subtitle1">
          Vietnam Railways, 118 Le Duan, Hoan Kiem, Hanoi. Phone number: 19006469. Email: dsvn@vr.com.vn
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
  export default {
    data() {
      return {
        cart : false,
        left: false,
        fab2: false,
        hideLabels: false
      }
    }
  }
</script>

<style>
  .toolbar {
    padding: 0 150px;
  }

  .header__icon-top {
    right: 16px !important;
    border: 1.4px solid white;
    color: white;
    background: orange;
    border-radius: 50px;
    font-size: 9px;
    padding: 5px;
    height: 12px;
    top: 4px;
  }

  .header__icon {
    color: #fff;
    font-size: 15px;
  }

  .header__list-icon {
    padding-top: 10px;
  }

  .header__icon-text {
    color: gray;
    font-size: 13px;
  }

  .header__icon-link {
    text-decoration: none;
    color: gray;
  }
</style>
