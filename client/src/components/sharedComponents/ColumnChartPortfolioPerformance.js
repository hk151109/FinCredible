import { bottom } from '@popperjs/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BsTextCenter } from 'react-icons/bs';
import { ImPriceTag } from 'react-icons/im';
import './ChartHoldingByCompany.css'

const ColumnChartPortfolioPerformance = ({ portfolioData, portfolioTotals }) => {

    let labels = portfolioData.map((holding) => {
        return (
            `${holding.name}, (${holding.symbol})`
        )
    })
    
    labels = ['Portfolio Total', ...labels]
    
    let holdingsTotalPaid = portfolioData.map(holding => {
        return (Number((holding.avgPurchasePrice * holding.numberOfShares).toFixed(2)))      
    })
        
    let holdingsTotalValue = portfolioData.map(holding => {
        return (Number((holding.currentPrice * holding.numberOfShares).toFixed(2)))
    })

    let holdingsPL = portfolioData.map(holding => {
        return (
            (holding.currentPrice * holding.numberOfShares) - (holding.avgPurchasePrice * holding.numberOfShares).toFixed(2)
        )
    })
    
    const portfolioTotalPaid = portfolioTotals.paid
    const portfolioTotalValue = portfolioTotals.value
    const portfolioTotalPL = (portfolioTotalValue - portfolioTotalPaid)
          
    holdingsTotalPaid = [portfolioTotalPaid, ...holdingsTotalPaid]
    holdingsTotalValue = [portfolioTotalValue, ...holdingsTotalValue]
    holdingsPL = [portfolioTotalPL, ...holdingsPL]
    
    const options = {
        chart: {
            plotBackgroundColor: 'white',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'Current Portfolio performance'
        },
        tooltip: {
            pointFormat: '{point.series.name}: <b>$ {point.y: .2f}</b>'
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false, //this can be toggledd to turn labels on/off
                    inside: true,
                    rotation: 90,
                    align: 'center',
                    format: '{point.series.name}'
                }
            }
        },
        xAxis: {
            categories: labels 

        },
        credits: {
            enabled: false
        },
        series: [{
                name: 'Total Paid Price',
                data: holdingsTotalPaid
            },
            {
                name: 'Total Value',
                data: holdingsTotalValue
            },
            {
                name: 'Profit',
                data: holdingsPL,
                color: '#33FF57',
                negativeColor: '#FF5733'
            },
            {
                name: 'Loss',
                color: '#FF5733'
            }
        ]
    }

    return (
        <div className='barchart'>
        <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )

}

export default ColumnChartPortfolioPerformance;