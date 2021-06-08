import React, {useEffect, useState} from 'react'
import './Page.css'
import ReactAce from 'react-ace-editor'
import {Line} from 'react-chartjs-2'

import instanceAxios from '../../ajax/instanceAxios'

const Header = () => {
    return (
        <header>
            <h1>Gabriel's Challenge</h1>
        </header>
    )
}

const CodeDisplay = ({setState}) => {

    const [fromInput, setFromInput] = useState([])

    return (
        <>
            <div className="code-display">
                <ReactAce
                    mode="json"
                    theme="tomorrow_night"
                    setReadOnly={false}
                    onChange={setFromInput}
                    style={{ 'height': '350px' }}
                />
            </div>
            <footer>
                <button
                    onClick={() => {setState(fromInput)}}
                >GENERATE CHART</button>
            </footer>
        </>
    )
}



const Page = () => {

    const [teste, setTeste] = useState([])

    const [jsonComponents, setJsonComponents] = useState([])

    const getJsonComponents = async () => {
        try {
            const response = await instanceAxios.get('../../json/jsonTemp.json')
            setJsonComponents(response.data.dataTime)
            
        } catch(error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getJsonComponents()
    },[])

    let linuxBrowserChome = null
    linuxBrowserChome = jsonComponents ? jsonComponents.filter(item => {
        return (
            item.browser === "chrome" && item.os === "linux"
        )
    }) : null

    let linuxBrowserFireFox = null
    linuxBrowserFireFox = jsonComponents ? jsonComponents.filter(item => {
        return (
            item.browser === "firefox" && item.os === "linux"
        )
    }) : null


    let macBrowserChome = null
    macBrowserChome = jsonComponents ? jsonComponents.filter(item => {
        return (
            item.browser === "chrome" && item.os === "mac"
        )
    }) : null

    let macBrowserFireFox = null
    macBrowserFireFox = jsonComponents ? jsonComponents.filter(item => {
        return (
            item.browser === "firefox" && item.os === "mac"
        )
    }) : null

    const objChart = (label, start, end, color) => {
        return (
            {
                label: label,
                data:
                [
                    start, end
                ],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 3
            }
        )
    }

    let dataJsonChart = []

    if(jsonComponents.length > 0){
        dataJsonChart = 
        [
            objChart(
                'linux chrome min response time',
                linuxBrowserChome[0].min_response_time, 
                linuxBrowserChome[1].min_response_time,
                'orange'
            ),
            objChart(
                'linux chrome max response time',
                linuxBrowserChome[0].max_response_time, 
                linuxBrowserChome[1].max_response_time,
                'purple'
            ),
            objChart(
                'linux firefox min response time',
                linuxBrowserFireFox[0].min_response_time, 
                linuxBrowserFireFox[1].min_response_time,
                'black'
            ),
            objChart(
                'linux firefox max response time',
                linuxBrowserFireFox[0].max_response_time, 
                linuxBrowserFireFox[1].max_response_time,
                'blue'
            ),
            objChart(
                'mac chrome min response time',
                macBrowserChome[0].min_response_time, 
                macBrowserChome[1].min_response_time,
                'gray'
            ),
            objChart(
                'mac chrome max response time',
                macBrowserChome[0].max_response_time, 
                macBrowserChome[1].max_response_time,
                'green'
            ),
            objChart(
                'mac firefox min response time',
                macBrowserFireFox[0].min_response_time, 
                macBrowserFireFox[1].min_response_time,
                'yellow'
            ),
            objChart(
                'mac firefox max response time',
                macBrowserFireFox[0].max_response_time, 
                macBrowserFireFox[1].max_response_time,
                'pink'
            )
        ]
    }

    return(
        <div className="page">
            <Header/>
            <CodeDisplay
                setState={setTeste}
            />
            <div className="chart">
                <Line
                    data={{
                        labels: ['00:00', '00:01'],
                        datasets: dataJsonChart
                    }}
                    width={100}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        scales:{
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Page