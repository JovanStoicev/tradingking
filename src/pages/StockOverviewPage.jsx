import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'
import tradingKing from '../image/tradingKing.jpg'

const StockOverviewPage = () => {
  return (
    <div>
      <img src={tradingKing} alt="photo" className="img-center" />
      <AutoComplete />
      <StockList />
    </div>
  )
}

export default StockOverviewPage;