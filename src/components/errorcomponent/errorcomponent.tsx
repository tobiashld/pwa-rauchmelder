import { Error, ErrorList } from '../../types/errortype';
import ErrorPortal from '../errorportal/errorportal';
import styles from './errorcomponent.module.css'


function ErrorComponent(props:{errorListe:ErrorList}) {



    if(!props || !props.errorListe){
        return null;
    }
    
    
    

  return (
    <ErrorPortal wrapperId={styles["react-portal-modal-container"]}>
        <div className={styles['error-wrapper']}>
            {props.errorListe.map((error:Error,index:number)=>{
                return(
                <div key={index} className={styles[error.type] + ' ' + styles['error-box'] +' '+styles['show-vertical']}>
                    
                    <div className={styles['error-box-title']}>
                        {error.title}
                    </div>
                    <p>
                        {error.message}
                    </p>
                    <div className={styles['loading-bar-container']}>
                        <div className={styles["loading-bar-content"]}>
                        </div>
                    </div>
                </div>
            ) })}
        </div>
       
        
    </ErrorPortal>
  )
}


export default ErrorComponent