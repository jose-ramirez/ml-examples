<template>
  <div>
    <button v-on:click="nextStep">Next step</button>
    <div id="chart_div" style="width: 900px; height: 500px;"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Component from 'vue-class-component'
import data from '../data'
import kmeans from '../algorithms/KMeans'

@Component({})
export default class KMeans extends Vue {
  private model: any

  mounted(){
    this.model = new kmeans(data, 2, [{x: 2, y: 80}, {x: 3, y: 90}])
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


  update(){
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
        hAxis: { title: "Eruption duration (min)", minValue: 0, maxValue: 5 },
        vAxis: { title: "Waiting time (min)", minValue: 40, maxValue: 100 },
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
    this.update()
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
