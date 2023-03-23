import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index])
    }
  })
}

const StockDetailPage = () => {
  const [chartData, setChartData] = useState([])
  const { symbol } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      // currentTime = date.getTime() but it gives it in 'ms'. this api works with seconds so currentTime need to be devided by 1000 to convert it from 'ms' to 's'. Also should use Math.floor to round it without decimals

      // take care that stock market "didn't work" on weekend so if you want to fetch data from friday or sutarday to sunday, it's possible to not show data
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay;
      // check if it's saturday to get last data from thursday to friday
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      } else if (date.getDay() === 0) {
        // check if it's sunday to get last data from thursday to friday
        oneDay = currentTime - 3 * 24 * 60 * 60
      } else {
        // currentTime - 24hours*60minutes*60seconds
        oneDay = currentTime - 24 * 60 * 60
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60
            }
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W"
            }
          })
        ])
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err)
      }

    }
    fetchData()
  }, [symbol])

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  )
}

export default StockDetailPage;