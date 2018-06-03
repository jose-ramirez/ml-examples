<template>
  <div class="flex-container">
    <div id="chart_div" style="width: 600px; height: 600px;"></div>

    <div>
      <button v-on:click="nextStep">Next step</button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import iris from "../data/iris";
import Component from "vue-class-component";
import pca from "../algorithms/PCA";
import { GoogleCharts } from "google-charts";

@Component({})
export default class PCA extends Vue {
  private model: any = new pca(iris);

  initialOptions() {
    return {
      title: "Iris dataset",
      hAxis: { title: "X", minValue: 0, maxValue: 5 },
      vAxis: { title: "Y", minValue: 0, maxValue: 5 },
      legend: "none",
      colors: ["#AAA"]
    };
  }

  initialDraw() {
    let d = [["X", "gray"], ...iris.map(r => [r.sepal_length, r.sepal_width])];
    let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(d);
    let chart = new GoogleCharts.api.visualization.ScatterChart(
      document.getElementById("chart_div")
    );
    chart.draw(dataPoints, this.initialOptions());
  }

  updatedOptions() {
    return {
      title: "Iris dataset",
      hAxis: { title: "Component 1", minValue: 0, maxValue: 1 },
      vAxis: { title: "Component 2", minValue: 0, maxValue: 1 },
      legend: "none",
      colors: ["#FF0", "#00F", "#0F0"]
    };
  }

  updateDraw() {
    let d = [
      ["X", "setosa", "versicolor", "virginica"],
      ...this.model.parameters.projected_data
        .slice(0, 50)
        .map(y => [y[0], y[1], null, null]),
      ...this.model.parameters.projected_data
        .slice(50, 100)
        .map(b => [b[0], null, b[1], null]),
      ...this.model.parameters.projected_data
        .slice(100, 150)
        .map(g => [g[0], null, null, g[1]])
    ];
    let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(d);
    let chart = new GoogleCharts.api.visualization.ScatterChart(
      document.getElementById("chart_div")
    );
    chart.draw(dataPoints, this.updatedOptions());
  }

  updatePlot() {
    GoogleCharts.load(this.updateDraw);
  }

  mounted() {
    this.model.step();
    GoogleCharts.load(this.initialDraw);
  }

  nextStep() {
    this.updatePlot();
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
