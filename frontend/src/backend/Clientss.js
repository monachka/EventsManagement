import React, { useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';

const Clientss = ()=>{

    const columns=[
        { field: 'id', headerName: 'Identifiant', width: 150,headerClassName: 'custom-header'   },
        { field: 'prenom', headerName: 'Prenom', width: 150,headerClassName: 'custom-header'   },
        { field: 'nom', headerName: 'Nom', width: 150,headerClassName: 'custom-header' },
        { field: 'adresse', headerName: 'Adresse', width: 150,headerClassName: 'custom-header'},
        { field: 'telephone', headerName: 'Telephone', width: 150,headerClassName: 'custom-header'},
        { field: 'email', headerName: 'Email', width: 150,headerClassName: 'custom-header'},
        { field: 'role', headerName: 'Role', width: 150,headerClassName: 'custom-header'},
    ];

    





    const[dataClients, setDataClients]=useState([]);
    useEffect( ()=>{
        fetchClients();
        
    }, [] );
    const fetchClients=() =>{
        
        fetch("http://localhost:8080/api/clients", { 
            method: 'GET',
            headers: {"Content-Type":"application/json"},
            
        })
        .then(response => response.json())
            .then(data => {
               
                const clients = Array.isArray(data) ? data : (data._embedded ? data._embedded.dataClients : []);
                setDataClients(clients);
                console.log(clients); // Vérifiez les données dans la console
                
            })
            .catch(err => {
                console.error(err);
                
            });
    };

    return(  
        <React.Fragment>
            <div className="">
                <DataGrid
                    rows={dataClients}
                    columns={columns}
                    disableRowSelectionOnClick ={true}
                    disableColumnMenu={true} 
                    disableColumnSelector={true} 
                    disableColumnReorder ={true} 
                    headerClassName="non-clickable"
                    style={{ fontSize: '20px'  }}         
                />
            </div>   
        </React.Fragment>
        );







};
export default Clientss;