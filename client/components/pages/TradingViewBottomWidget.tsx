import React, { useEffect } from 'react'
import { TradingViewWidget } from 'react-tradingview-widget'
type Props = {}

const TradingViewBottomWidget = (props: Props) => {
  return (
    <div className='ticker-container'>
      <div className='ticker-canvas'>
        <TradingViewWidget
          symbol='AAPL'
          locale='en'
          autosize
          hideSideToolbar
          hideLegend
          theme='dark'
          interval='D'
          style='1'
          withdateranges
          range='YTD'
          showpopupbutton
        />
      </div>
      <div className='content'>
        <p>Applying styles to iframe.</p>
      </div>
    </div>
  )
}

export default TradingViewBottomWidget
