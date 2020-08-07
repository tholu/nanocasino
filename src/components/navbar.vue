<template>
  <div>
    <template>
      <b-navbar class="is-dark">
        <template slot="brand">
          <b-navbar-item>
            <strong class="has-text-white">NANOKE</strong>
          </b-navbar-item>
        </template>

        <template slot="start">
          <b-navbar-item class="has-background-white">
            <a target="_blank" href="https://repl.it/@amanistesting/nanocasino">Bet Verify</a>
          </b-navbar-item>
        </template>

        <template slot="end">
          <b-navbar-item>
            <a target="_blank" v-bind:href="discord1">
              <i class="has-text-white fab fa-discord fa-2x"></i>
            </a>
          </b-navbar-item>

          <b-navbar-item>
            <a target="_blank" v-bind:href="github1">
              <i class="has-text-white fab fa-github fa-2x"></i>
            </a>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discord1: "https://discord.gg/EJJZDRR",
      github1: "https://github.com/besoeasy/nanocasino"
    };
  }
};
</script>
