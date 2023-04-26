import React from 'react'
import PruefungenPlanen from './pruefungPlanen/pruefungplanen'
import styles from './overview.module.css'
import OverviewChart from './overviewChart/overviewchart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { Box, Typography } from '@mui/material'

function OverviewComponent() {
  const username = useSelector((state:RootState)=>state.username)

  return (
    <Box className={styles.overview}>
      <Box sx={{backgroundColor:'transparent',color:'text.primary'}} className={styles.welcomeMessage} > 
        <p >Wilkommen, {username}!</p><div>Hier ist eine kleine Übersicht</div>
        
      </Box>
      <Box sx={{backgroundColor:'background.default',color:'text.primary'}} className={styles.overviewelement}>
        <OverviewChart />
      </Box>
      <Box sx={{backgroundColor:'background.default',color:'text.primary'}} className={styles.overviewelement}>
        <PruefungenPlanen />
      </Box>
      <Box sx={{backgroundColor:'background.default',color:'text.primary'}} className={styles.overviewelement}>
        <Box>coming soon...</Box>
      </Box>
      <Box sx={{backgroundColor:'background.default',color:'text.primary'}} className={styles.overviewelement}>
        <Box>coming soon...</Box>
      </Box>
    </Box>
  )
}

export default OverviewComponent