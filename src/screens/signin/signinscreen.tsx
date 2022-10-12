import React, { useRef } from 'react'
import TextInput from '../../components/textinput/textinput';
import styles from './signinscreen.module.css'
import { FiUser } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useAppDispatch } from '../../store/store';
import { login } from '../../store/slice';

function SignInScreen() {
  const usernameRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const dispatch = useAppDispatch()

  const handleLoginbutton = (event:any)=>{

    if(!usernameRef.current || !passwordRef.current){
      return;
    }
    dispatch(login({username:usernameRef.current.value,password:passwordRef.current.value}))
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Martin Herhold SuD</h1>
      </div>
      <div className={styles.loginboxcontainer}>

        <div className={styles.loginbox}>
          <div className={styles.headertext}>
            <h2>
              Welcome Back
            </h2>
          </div>
          <div className={styles.divider}>
            
          </div>
          <div className={styles.usereingabe}>
            
              <div className={styles.username}>
                <TextInput 
                  ref={usernameRef}
                  placeholder='Benutzername'
                  icon={<FiUser />}
                  
                />
              </div>
              <div className={styles.password}>
                <TextInput 
                  placeholder='Passwort'
                  type='password'
                  icon={<RiLockPasswordLine />}
                  ref={passwordRef}
                />
              </div>
              <div className={styles.loginbuttoncontainer}>
                <button onClick={handleLoginbutton} className={styles.loginButton}>Login</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInScreen