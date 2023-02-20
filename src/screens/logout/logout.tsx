import { useSnackbar } from 'notistack'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store/slice'
import { useAppDispatch } from '../../store/store'

function Logout() {

    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    enqueueSnackbar("Erfolgreich ausgeloggt!",{variant:"success"})
    dispatch(logout())
    navigate("/")

    return (
        <></>
    )
}

export default Logout