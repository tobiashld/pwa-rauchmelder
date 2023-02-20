import { Chip, Dialog, DialogContent, DialogTitle, IconButton, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import dataFunctions from '../../../services/datafunctions';
import Loadingspinner from '../../loadingspinner/loadingspinner';
import { Rauchmelder,  } from '../../../types/rauchmelder';
import { dateOptions } from '../../../services/globals';
import VisibilityIcon from '@mui/icons-material/Visibility';
import styles from './rauchmelderhistorienDialog.module.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

const RauchmelderHistorienDialog = (props:{rauchmelderHistorienId:number,isShown:boolean,handleClose:any})=>{
    const historienquery = useQuery(["rauchmelder","historie",props.rauchmelderHistorienId],()=>dataFunctions[1].rauchmelder.getHistory(props.rauchmelderHistorienId),{enabled:props.isShown})
    
    return <BootstrapDialog
    fullWidth
    maxWidth={'md'}
    onClose={props.handleClose}
    aria-labelledby="customized-dialog-title"
    open={props.isShown}
  >
    <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
      Rauchmelder Historie
    </BootstrapDialogTitle>
    <DialogContent dividers >
        
        {historienquery.isLoading || !historienquery.data || !historienquery.data.data?<div style={{alignSelf:'center'}}><Loadingspinner size='Big' /></div>:
    <>
        <div className={styles.chipbox}>

        
            {historienquery.data!.data![0].wohnung.etage && historienquery.data!.data![0].wohnung.etage!== '-'?<Chip 
                key={0}
                label={historienquery.data!.data![0].wohnung.etage}
                />:<></>}
            {historienquery.data!.data![0].wohnung.wohnungslage && historienquery.data!.data![0].wohnung.wohnungslage!== '-' && historienquery.data!.data![0].wohnung.wohnungslage!== ' '?<Chip 
                key={1}
                label={historienquery.data!.data![0].wohnung.wohnungslage}
                />:<></>}

            {historienquery.data!.data![0].wohnung.haus && historienquery.data!.data![0].wohnung.haus!== '-'?<Chip 
                key={2}
                label={historienquery.data!.data![0].wohnung.haus}
                />:<></>}
            {historienquery.data!.data![0].wohnung.nachname && historienquery.data!.data![0].wohnung.nachname!== '-'?<Chip 
                key={3}
                label={historienquery.data!.data![0].wohnung.nachname}
                />:<></>}
                </div>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell
                  key={"test"}
                  align={'center'}
                >
                  Raum
                </TableCell>
                <TableCell
                  key={"test1"}
                  align={'center'}
                >
                  Seriennr
                </TableCell>
                <TableCell
                  key={"test2"}
                  align={'center'}
                >
                  Produziert
                </TableCell>
                <TableCell
                  key={"test3"}
                  align={'center'}
                >
                  Inbetrieb am
                </TableCell>
                <TableCell
                  key={"test4"}
                  align={'center'}
                >
                  Ersetzt am
                </TableCell>
                <TableCell
                  key={"test5"}
                  align={'center'}
                >
                    Aktueller
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historienquery!.data!.data![0].rauchmelderHistorie.sort((a:Rauchmelder,b:Rauchmelder)=>b.id!-a.id!).map(rauchmelder=>{
                return (
                  <TableRow selected={rauchmelder.isactive} hover role="checkbox" tabIndex={-1} key={"rauchmelder"+rauchmelder.id}>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.raum}
                    </TableCell>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.seriennr}
                    </TableCell>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.produktionsdatum?.toLocaleDateString("de-DE",dateOptions)}
                    </TableCell>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.installedAt?.toLocaleDateString("de-DE",dateOptions)}
                    </TableCell>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.outOfOrderAt?.toLocaleDateString("de-DE",dateOptions)}
                    </TableCell>
                    <TableCell key={""} align={"center"}>
                        {rauchmelder.isactive?<VisibilityIcon />:<></>}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper></>}
        
    
    </DialogContent>
      
    
  </BootstrapDialog>
}


export default RauchmelderHistorienDialog