<template>
  <div class="flex-container">
    <div id="chart_div" style="width: 600px; height: 600px;"></div>

    <div>
      <button v-on:click="nextStep">Next step</button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import birds from '../data/birds'
import Component from 'vue-class-component'
import pca from '../algorithms/PCA'
import {GoogleCharts} from 'google-charts'

@Component({})
export default class PCA extends Vue {
  private model: any = new pca(birds);

  initialOptions() {
    return {
      title: "Birds dataset",
      hAxis: { title: "X", minValue: 0, maxValue: 5 },
      vAxis: { title: "Y", minValue: 0, maxValue: 5 },
      legend: "none",
      colors: ["#AAA"]
    }
  }

  initialDraw(){
      let d = [
        ["X", "gray"],
        ...birds.map(r => [r.length, r.weight]),
      ]
      let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(d)
      let chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById("chart_div"))
      chart.draw(dataPoints, this.initialOptions())
  }

  updatedOptions(){
    return {
      title: "Birds dataset",
      hAxis: { title: "Component 1", minValue: 0, maxValue: 1 },
      vAxis: { title: "Component 2", minValue: 0, maxValue: 1 },
      legend: "none",
      colors: ["#AAA"]
    }
  }

  updateDraw(){
      let d = [
        ["X", "gray"],
        ...this.model.parameters.projected_data
      ]
      let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(d)
      let chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById("chart_div"))
      chart.draw(dataPoints, this.updatedOptions())
  }

  updatePlot(){
    GoogleCharts.load(this.updateDraw)
  }

  mounted(){
    this.model.step()
    GoogleCharts.load(this.initialDraw)
  }

  nextStep(){
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
