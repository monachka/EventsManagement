import React, { useState, useEffect } from 'react';
// import './Prestatairess.css';
import events1 from '../img/eventsAlive.jpeg';
import star from '../img/star.jpg';
// import './Clientss.css';
import logo from '../img/tak.jpeg';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/Clear';
import { SERVER_URL } from './Constantess';
import { DataGrid } from '@mui/x-data-grid';





const Prestatairess = ({ state, who, id }) => {
  const columns=[
    { field: 'id', headerName: 'Identifiant', width: 150,headerClassName: 'custom-header'   },
    { field: 'nom', headerName: 'Nom', width: 150,headerClassName: 'custom-header'   },
    { field: 'adresse', headerName: 'Adresse', width: 150,headerClassName: 'custom-header' },
    { field: 'telephone', headerName: 'Telephone', width: 150,headerClassName: 'custom-header'},
    { field: 'capacityEvents', headerName: 'Nombre_Events', width: 150,headerClassName: 'custom-header'},
    { field: 'etoile', headerName: 'Etoile', width: 150,headerClassName: 'custom-header'},
    { field: 'typeService', headerName: 'Type_Service', width: 150,headerClassName: 'custom-header'},
    { field: 'role', headerName: 'Role', width: 150,headerClassName: 'custom-header'},
];







const[dataPres, setDataPres]=useState([]);
useEffect( ()=>{
    fetchPres();
    
}, [] );
const fetchPres=() =>{
    
    fetch("http://localhost:8080/api/prestataires", { 
        method: 'GET',
        headers: {"Content-Type":"application/json"},
        
    })
    .then(response => response.json())
        .then(data => {
           
            const press = Array.isArray(data) ? data : (data._embedded ? data._embedded.dataPres : []);
            setDataPres(press);
            console.log(press); // Vérifiez les données dans la console
            
        })
        .catch(err => {
            console.error(err);
            
        });
};

return(  
    <React.Fragment>
        <div className="">
            <DataGrid
                rows={dataPres}
                columns={columns}
                disableRowSelectionOnClick ={true}
                disableColumnMenu={true} 
                disableColumnSelector={true} 
                disableColumnReorder ={true} 
                style={{ fontSize: '20px'  }}           
            />
        </div>   
    </React.Fragment>
    );







};

export default Prestatairess;