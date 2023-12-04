import React, { useEffect, useState} from "react";
// import './Evenementss.css';
import { DataGrid } from '@mui/x-data-grid';

const Evenementss=()=>{
    const columns=[
        { field: 'id', headerName: 'Identifiant', width: 150,headerClassName: 'custom-header'   },
        { field: 'typeEvent', headerName: 'Type_Event', width: 150,headerClassName: 'custom-header'   },
        { field: 'adresseEvent', headerName: 'Adresse_Event', width: 150,headerClassName: 'custom-header' },
        { field: 'dateEvent', headerName: 'Date_Event', width: 150,headerClassName: 'custom-header'},
        { field: 'heureEvent', headerName: 'Heure_Event', width: 150,headerClassName: 'custom-header'},
    ];

    const[dataEve, setDataEve]=useState([]);
    useEffect( ()=>{
        fetchEvent();
        
    }, [] );
    const fetchEvent=() =>{
        
        fetch("http://localhost:8080/api/evenement", { 
            method: 'GET',
            headers: {"Content-Type":"application/json"},
            
        })
        .then(response => response.json())
            .then(data => {
               
                const event = Array.isArray(data) ? data : (data._embedded ? data._embedded.dataEve : []);
                setDataEve(event);
                console.log(event); // Vérifiez les données dans la console
                
            })
            .catch(err => {
                console.error(err);
                
            });
    };

    return(  
        <React.Fragment>
            <div className="">
                <DataGrid
                    rows={dataEve}
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
export default Evenementss;