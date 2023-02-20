import React from 'react'
import PruefungenPlanen from './pruefungPlanen/pruefungplanen'
import styles from './overview.module.css'
import OverviewChart from './overviewChart/overviewchart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

function OverviewComponent() {
  const username = useSelector((state:RootState)=>state.username)

  return (
    <div className={styles.overview}>
      <div className={styles.welcomeMessage} > 
        <p >Wilkommen, {username}!</p><div>Hier ist eine kleine Übersicht</div>
        
      </div>
      <div className={styles.overviewelement}>
        <OverviewChart />
      </div>
      <div className={styles.overviewelement}>
        <PruefungenPlanen />
      </div>
      <div className={styles.overviewelement}>
        <div>coming soon...</div>
      </div>
      <div className={styles.overviewelement}>
        <div>coming soon...</div>
      </div>
    </div>
  )
}

export default OverviewComponent