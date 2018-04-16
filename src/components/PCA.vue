<template>
  <div class="flex-container">
    <div id="chart_div" style="width: 600px; height: 600px;"></div>

    <div>
      <button v-on:click="nextStep">Next step</button>
      <ul>
        <li v-for="cost in costArray" :key="cost">
          {{ cost }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import birds from '../data/birds'
import Component from 'vue-class-component'
import pca from '../algorithms/PCA'

@Component({})
export default class PCA extends Vue {
  costArray: any[] = []
  private model: any = new pca(birds);
  private cost: number = 0

  initialOptions() {
    return {
      title: "Birds",
      hAxis: { title: "X", minValue: 0, maxValue: 5 },
      vAxis: { title: "Y", minValue: 0, maxValue: 5 },
      legend: "none",
      colors: ["#AAA", "#000"]
    }
  }

  initialDraw(){
      let google = window["google"]
      let d = [
        ["X", "gray"],
        ...birds.map(r => [r.length, r.weight]),
      ]
      let dataPoints = google.visualization.arrayToDataTable(d)
      let chart = new google.visualization.ScatterChart(document.getElementById("chart_div"))
      chart.draw(dataPoints, this.initialOptions())
  }

  mounted(){
    let google = window["google"]
    google.charts.load("current", { packages: ["corechart"] })
    google.charts.setOnLoadCallback(this.initialDraw)
  }

  nextStep(){
    this.model.step()
    this.costArray.push(this.model.parameters.cost)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.flex-container {
  display: flex;
  flex-direction: row;
}
</style>
