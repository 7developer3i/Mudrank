import React from 'react'
import Chartone from './chartone'
import UserChart from './charttwo'

export const ChartPage = () => {
  return (
    <div>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Chartone/>
      <UserChart/>
      </div>
    </div>
  )
}
