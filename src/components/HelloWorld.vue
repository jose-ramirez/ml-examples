<template>
    <div id="chart_div" style="width: 900px; height: 500px;"></div>
</template>

<script>
import tableData from '../assets/data.json'

export default {
  name: "HelloWorld",

  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },

  mounted() {
    let google = window["google"]
    google.charts.load("current", { packages: ["corechart"] })
    google.charts.setOnLoadCallback(drawChart)

    function drawChart() {
      let d = tableData.map(r => [r.x, r.y])
      d.unshift(["Eruptions (min)", "Waiting time (min)"])
      var data = google.visualization.arrayToDataTable(d)

      var options = {
        title: "Old faithful dataset",
        hAxis: { title: "Waiting", minValue: 0, maxValue: 5 },
        vAxis: { title: "Eruptions", minValue: 40, maxValue: 100 },
        legend: "none"
      }

      var chart = new google.visualization.ScatterChart(
        document.getElementById("chart_div")
      )

      chart.draw(data, options);
    }
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
