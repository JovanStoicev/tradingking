import Chart from 'react-apexcharts'
import { useState } from 'react'

const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h")
  const { day, week, year } = chartData

  // console.log(chartData)
  

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }
  const timeConst = determineTimeFormat()
  console.log(Object.keys(timeConst).length)
  const color = timeConst?.[Object.entries(timeConst).length].y - timeConst?.[1].y > 0 ? "#26c281" : "#ed3419"  

  // console.log(color)
  const options = {
    // colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        dateTimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "dd MMM HH:MM"
      }
    }
  }



  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if (button === dateFormat) {
      return classes + "btn-primary"
    } else {
      return classes + "btn-outline-primary"
    }
  }

  return <div className="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} type="area" width="100%" />
    <div>
      <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
      <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
      <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
    </div>
  </div>

}

export default StockChart;