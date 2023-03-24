import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'
import tradingKing from '../image/tradingKing.jpg'

const StockOverviewPage = () => {
  return (
    <div>
      <img src={tradingKing} alt="photo" className="img-center" />
      <AutoComplete />
      <StockList />
      <p style={{ textAlign: 'center' }}>Click on stock to see details</p>
    </div>
  )
}

export default StockOverviewPage;