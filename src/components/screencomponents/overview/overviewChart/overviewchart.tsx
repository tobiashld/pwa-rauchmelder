import React, { useEffect, useState } from 'react'
// import styles from './overview.module.css'
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import data from '../../../../services/datafunctions'
import { ClientStatus } from '../../../../types/statusenum'
import styles from './overview.module.css'

function OverviewChart() {
  const [chartData,setChartData] = useState<{name:string,value:number}[]>([])
  useEffect(()=>{
    data[ClientStatus.online].pruefungen.statistics((data)=>{
      setChartData(Object.keys(data.data[0]).map((key:string)=>{
        return {
          name:key,
          value:data.data[0][key] as number
        }
      }))
    })
  },[])
  return (
    
      <div className={styles.chartdiv}>
        <div className={styles.title}>Erfolgreiche Pruefungskategorien</div>
      <ResponsiveContainer className={styles.chart}>
        <LineChart 
              data={chartData}
              margin={{left:0,right:40,top:20,bottom:10}}
              >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
        
  )
}

export default OverviewChart