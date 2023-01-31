import React from 'react'
import Loadingspinner from '../../loadingspinner/loadingspinner'
import PruefungenPlanen from '../../pruefungPlanen/pruefungplanen'
import styles from './overview.module.css'
import OverviewChart from './overviewChart/overviewchart'

function OverviewComponent() {
  return (
    <div className={styles.overview}>
      <div className={styles.overviewelement}>
        <OverviewChart />
      </div>
      <div className={styles.overviewelement}>
        <PruefungenPlanen />
      </div>
      <div className={styles.overviewelement}>
        <Loadingspinner size="Big"/>
      </div>
      <div className={styles.overviewelement}>
        <Loadingspinner size="Big"/>
      </div>
    </div>
  )
}

export default OverviewComponent