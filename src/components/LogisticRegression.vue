<template>
  <div class="flex-container">
    <div id="chart_div" style="width: 600px; height: 600px;"></div>

    <div>
      <button v-on:click="nextStep">Next step</button>
      <div>{{ params }}</div>
      <!--
      <ul>
        <li v-for="cost in costArray" :key="cost">
          {{ cost }}
        </li>
      </ul>
      -->
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import students from '../data/students'
import logreg from '../algorithms/LogisticRegression'
import {GoogleCharts} from 'google-charts'
import _ from 'lodash'

@Component({})
export default class LogReg extends Vue { 
  costArray: any[] = []
  private model: any = new logreg()
  private cost: number = 0
  private params: any = []

  initialOptions() {
    return {
      title: "Student admission test results' dataset",
      hAxis: { title: "Test 1 result", minValue: 50, maxValue: 100 },
      vAxis: { title: "Test 2 result", minValue: 50, maxValue: 100 },
      legend: "none",
      colors: ["green", "black"]
    }
  }

  initialDraw(){
      let d = [ 
        ["X", "Approved", "Failed"],
        ...students.data.map(r => {
          if(r.approved == 1) {return [r.grade_1, r.grade_2, null]}
          else {return [r.grade_1, null, r.grade_2]} 
        })
      ]
      let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(d)
      let chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById("chart_div"))
      chart.draw(dataPoints, this.initialOptions())
  }

  updatedOptions(){
    return {
      title: "Student admission test results' dataset",
      hAxis: { title: "Test 1 result", minValue: 50, maxValue: 100 },
      vAxis: { title: "Test 2 result", minValue: 50, maxValue: 100 },
      legend: "none",
      colors: ["green", "black", "red"],
      interpolateNulls: true,
      series: {
        2: { lineWidth: 1, pointSize: 0 }
      }
    }
  }

  updateDraw(){
      let p = this.params
      let range = students.data
        .map(d => d.grade_1)
        .map(x1 => (-p.theta[0] - (p.theta[1] * x1)) / p.theta[2])
      let d = [
        ...students.data.map(r => {
          if(r.approved == 1) {return [r.grade_1, r.grade_2, null]}
          else {return [r.grade_1, null, r.grade_2]} 
        })
      ]
      let _d = _.zip(d, range).map((s: any) => [...s[0], s[1]])
      _d.unshift(["X", "approved", "failed", "border"])
      console.log(_d)
      let dataPoints = GoogleCharts.api.visualization.arrayToDataTable(_d)
      let chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById("chart_div"))
      chart.draw(dataPoints, this.updatedOptions())
  }

  updatePlot(){
    GoogleCharts.load(this.updateDraw)
  }

  mounted(){
    GoogleCharts.load(this.initialDraw)
  }

  nextStep(){
    this.model.train(students.extract)
    this.params = this.model.parameters
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
