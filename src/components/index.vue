<template>
  <div>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container">
          <center class="is-hidden-mobile">
            <b-tooltip label="Deposit NANO To Play" always>
              <a :href="'nano:nano_3g1q1ocykdd8q4kwwxozjmo89gg8db4ae81s1or13tsknfnrba8ra931dgqn'">
                <img alt="Deposit NANO" :src="qrAddress" />
              </a>
            </b-tooltip>
          </center>

          <center>
            <div class="columns is-vcentered">
              <div class="column">
                <b-tooltip label="Maxwin" position="is-top" always>
                  <div class="control">
                    <b-taglist attached>
                      <b-tag type="is-light" size="is-small">{{ maxwin.toFixed(8) }}</b-tag>
                      <b-tag type="is-danger" size="is-small">NANO</b-tag>
                    </b-taglist>
                  </div>
                </b-tooltip>
              </div>
              <div class="column">
                <div class="has-text-centered">
                  <p
                    class="is-hidden-mobile"
                  >nano_3g1q1ocykdd8q4kwwxozjmo89gg8db4ae81s1or13tsknfnrba8ra931dgqn</p>

                  <a
                    :href="'nano:nano_3g1q1ocykdd8q4kwwxozjmo89gg8db4ae81s1or13tsknfnrba8ra931dgqn'"
                  >
                    <button class="button is-small is-hidden-desktop">Click To Open Wallet</button>
                  </a>
                </div>
              </div>

              <div class="column">
                <b-tooltip label="Recommended Bet" position="is-top" always>
                  <div class="control">
                    <b-taglist attached>       
                      <b-tag type="is-light" size="is-small">{{ (maxwin/4).toFixed(8) }}</b-tag>
                      <b-tag type="is-danger" size="is-small">NANO</b-tag>
                    </b-taglist>
                  </div>
                </b-tooltip>
              </div>
            </div>
          </center>
          <br />

          <center>
            <b-tooltip label="Chance (1 in 30)" position="is-bottom">
              <div class="control box">
                <b-taglist attached>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.1</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.3</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.4</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">3</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.5</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.6</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.7</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">4</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.1</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-link">1.2</b-tag>
                  <b-tag class="zoom" size="is-medium" type="is-danger">0</b-tag>
                </b-taglist>
              </div>
            </b-tooltip>
          </center>
        </div>
      </div>
    </section>

    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="subtitle">RECENT BETS</div>
            </div>

            <div class="column is-hidden-mobile has-text-right">Nextbet SHA256 : {{ nextbethashed }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-danger" v-if="pendingblocks">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="subtitle">Fetching {{ pendingblocks }} Pending Blocks</div>
          </div>
        </div>
      </div>
    </section>

    <template>
      <section>
        <b-table
          :data="data"
          :narrowed="true"
          :hoverable="true"
          :mobile-cards="true"
          paginated
          per-page="20"
          ref="table"
          :show-detail-icon="true"
          detailed
          @details-open="(row, index) => $buefy.toast.open(`Expanded ${row.height}`)"
        >
          <template slot-scope="props">
            <b-table-column field="height" label="Block">{{ props.row.height }}</b-table-column>
            <b-table-column field="account" label="Player">{{ props.row.account }}</b-table-column>
            <b-table-column field="amount" label="Bet">
              <b-tooltip label="NANO" position="is-right">{{ props.row.amount }}</b-tooltip>
            </b-table-column>

            <b-table-column
              field="betresult"
              label="Result"
              v-bind:class="props.row.betresult > 0 ? 'has-text-link' : 'has-text-danger'"
            >{{ props.row.betresult }} X</b-table-column>

            <b-table-column field="block" label="View">
              <b-tooltip label="View NANO Block" position="is-left">
                <a
                  target="_blank"
                  rel="noreferrer"
                  v-bind:href="'https://nanocean.org/block/' + props.row.block"
                >View</a>
              </b-tooltip>
            </b-table-column>
          </template>

          <template slot="detail" slot-scope="props">
            <div class="content">
              <table>
                <tr>
                  <td>Server Hash</td>
                  <td>{{ props.row.serverhash }}</td>
                </tr>
                <tr>
                  <td>SHA256(Server Hash)</td>
                  <td>{{ hashme(props.row.serverhash) }}</td>
                </tr>
                <tr>
                  <td>Block Hash</td>
                  <td>{{ props.row.block }}</td>
                </tr>
              </table>
            </div>
          </template>
        </b-table>
      </section>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import QRCode from "qrcode";
import sha256 from "crypto-js/sha256";

export default {
  data() {
    return {
      pendingblocks: null,
      qrAddress: "",
      maxwin: 0,
      nextbethashed: "",
      data: [],
    };
  },

  methods: {
    hashme(hash) {
      return sha256(hash);
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
    call_functions() {
      axios({
        method: "GET",
        url: "/api/bets",
      }).then((response) => {
        this.data = response.data.bets;
        this.maxwin = response.data.maxwin;
        this.nextbethashed = response.data.nextbethashed;
        this.pendingblocks = response.data.pendingblocks;
      });
    },
  },
  created() {
    this.timer = setInterval(this.call_functions, 5000);
  },
  mounted() {
    this.call_functions();

    QRCode.toDataURL(
      "nano:nano_3g1q1ocykdd8q4kwwxozjmo89gg8db4ae81s1or13tsknfnrba8ra931dgqn",
      { width: 250 }
    ).then((url) => {
      this.qrAddress = url;
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>


<style>
.zoom:hover {
  transform: scale(1.25);
}
</style>
