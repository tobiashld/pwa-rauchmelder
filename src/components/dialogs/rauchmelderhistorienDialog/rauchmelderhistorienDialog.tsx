import { Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, ListItem, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import dataFunctions from '../../../services/datafunctions';
import Loadingspinner from '../../loadingspinner/loadingspinner';
import { Rauchmelder,  } from '../../../types/rauchmelder';
import { dateOptions } from '../../../services/globals';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

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
    const historienquery = useQuery(["rauchmelder","historie",props.rauchmelderHistorienId],()=>dataFunctions[1].rauchmelder.getHistory(props.rauchmelderHistorienId))
    
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
        
        {historienquery.isLoading?<div style={{alignSelf:'center'}}><Loadingspinner size='Big' /></div>:
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Paper sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'row',
        gap:2,
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 1,
        m: 0,
      }}
      component="ul" >

        
            <Chip
                key={0}
                label={historienquery.data.data[0].wohnung.etage + historienquery.data.data[0].wohnung.wohnungslage }
                />
            <Chip 
                key={1}
                label={"test"}
                />
            <Chip 
                label={"test"}
                />
            <Chip 
                label={"test"}
                />
            <Chip 
                label={"test"}
                />
            <Chip 
                label={"test"}
                />
                </Paper>
        <Divider />
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
                  key={"test"}
                  align={'center'}
                >
                  Seriennr
                </TableCell>
                <TableCell
                  key={"test"}
                  align={'center'}
                >
                  Produziert
                </TableCell>
                <TableCell
                  key={"test"}
                  align={'center'}
                >
                  Inbetrieb
                </TableCell>
                <TableCell
                  key={"test"}
                  align={'center'}
                >
                  Ersetzt
                </TableCell>
                <TableCell
                  key={"test"}
                  align={'center'}
                >
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
                        {rauchmelder.isactive?<ModeEditIcon />:<></>}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>}
        
    
    </DialogContent>
      
    
  </BootstrapDialog>
}


export default RauchmelderHistorienDialog