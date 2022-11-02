import React from 'react'
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

    if(!usernameRef.current || !passwordRef.current || !validateInput()){
      // dispatch(addError({
      //   type:"warning",
      //   title:"Login Failed",
      //   message:"Benutzernamen und Passwort eingeben!",
      // }))
      // setTimeout(()=>dispatch(clearError()),5000)
      return;
    }
    dispatch(login({password:passwordRef.current.value,username:usernameRef.current.value}))
    // data[ClientStatus.online].user.getWithParam("full_name",usernameRef.current.value).then(user=>{
    //   if(0 < user.length && user.length < 2 && validPassword(user[0].full_name,user[0].password)){
    //     console.log("right password")
    //     dispatch(login({isSuccessfull:true,username:user[0].full_name}))
    //   }else{
    //     dispatch(login({isSuccessfull:false}))
    //     dispatch(addError({
    //       type:"warning",
    //       title:"Login Failed",
    //       message:"Benutzername oder Passwort ist falsch.",
    //     }))
    //     setTimeout(()=>dispatch(clearError()),3000)
    //   }
      
    // })
    
    
  }
  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(validateInput()){
        handleLoginbutton(null)
      }else{
        // dispatch(addError({
        //   type:"error",
        //   message:"Entweder das Passwort oder der Benutzername sind Falsch",
        //   title:"Login Failed!"
        // }))

      }
      
    }
  }
  const validateInput = ()=>{
    if(!usernameRef.current || !passwordRef.current || usernameRef.current.value === "" || passwordRef.current.value === ""){
      return false;
    }
    return true
  }


  return (
    <div className={styles.container}>
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
                  onKeyDown={handleKeyDown}
                  icon={<FiUser />}
                  
                />
              </div>
              <div className={styles.password}>
                <TextInput 
                  placeholder='Passwort'
                  type='password'
                  icon={<RiLockPasswordLine />}
                  onKeyDown={handleKeyDown}
                  ref={passwordRef}
                />
              </div>
              <div className={styles.loginbuttoncontainer}>
                <button tabIndex={0} onClick={handleLoginbutton} className={styles.loginButton}>Login</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInScreen