<template>
  <div class="flex-container">
    <p>log reg</p>
    <div id="chart_div" style="width: 600px; height: 600px;"></div>

    <div>
      <button v-on:click="nextStep">Next step</button>
      <ul id="example-1">
        <li v-for="cost in costArray" :key="cost">
          {{ cost }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import data from '../data'
import Component from 'vue-class-component'
import logreg from '../algorithms/LogisticRegression'

@Component({})
export default class LogisticRegression extends Vue {
  costArray: any[] = []
  private model: any = new logreg(data, 2, [{x: 2, y: 80}, {x: 3, y: 90}])
  private cost: number = 0

  mounted(){
    let google = window["google"]
    google.charts.load("current", { packages: ["corechart"] })
    google.charts.setOnLoadCallback(draw)

    let d = [
      ["X", "gray", "black"],
      ...data.map(r => [r.x, r.y, null]),
      ...this.model.parameters.centroids.map(c => [c.x, null, c.y])
    ]

    function draw(){
      let dataPoints = google.visualization.arrayToDataTable(d)

      var options = {
        title: "Old faithful dataset",
        hAxis: { title: "Eruption duration (min)", minValue: 0, maxValue: 5 },
        vAxis: { title: "Waiting time (min)", minValue: 40, maxValue: 100 },
        legend: "none",
        colors: ["#AAA", "#000"]
      }

      var chart = new google.visualization.ScatterChart(
        document.getElementById("chart_div")
      )

      chart.draw(dataPoints, options);
    }
  }


  updatePlot(){
    let google = window["google"]
    google.charts.load("current", { packages: ["corechart"] })
    google.charts.setOnLoadCallback(draw)

    let d = [
      ["X", "red", "blue", "black"],
      ...this.model.parameters.clusters[0].map(r => [r.x, r.y, null, null]),
      ...this.model.parameters.clusters[1].map(b => [b.x, null, b.y, null]),
      ...this.model.parameters.centroids.map(c => [c.x, null, null, c.y])
    ]

    function draw(){
      let dataPoints = google.visualization.arrayToDataTable(d)

      var options = {
        title: "Old faithful dataset",
        hAxis: { title: "Eruption duration (min)", minValue: 0, maxValue: 1 },
        vAxis: { title: "Waiting time (min)", minValue: 0, maxValue: 1 },
        legend: "none",
        colors: ["#F00", "#00F", "#000"]
      }

      var chart = new google.visualization.ScatterChart(
        document.getElementById("chart_div")
      )

      chart.draw(dataPoints, options);
    }
  }

  nextStep(){
    this.model.step()
    this.costArray.push(this.model.parameters.cost)
    this.updatePlot()
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
