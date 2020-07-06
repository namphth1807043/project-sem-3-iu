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
        </q-btn-group>

      </q-toolbar>
    </q-header>

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
        left: false
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
