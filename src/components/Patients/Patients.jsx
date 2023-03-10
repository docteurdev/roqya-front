import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { EyeIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { getPatient, setPatientRdv } from '../../redux/patients';
import Details from '../patientDetail/Details';


function Patients() {

  const rowData = useSelector(state => state.patients.pats);
  console.log(rowData);

  const dispatch = useDispatch();


  const CellBtn = ({ num }) => {
    return <label
      onClick={() => {
        dispatch(getPatient(num))
        dispatch(setPatientRdv(num.rdvs))
        
        document.getElementById("patient-popup").click();
        //   console.log(num);
      }}
      className=' bg-gray-800 font-semibold text-xs text-white rounded-lg p-2 cursor-pointer'

    >Voir fiche</label>
  }

  const [columnDefs] = useState([
    { field: 'id', resizeable: true, filter: 'agNumberColumnFilter', width: 80, headerName: 'N°' },
    { field: 'nom', resizeable: true, filter: true,width: 120, },
    { field: 'prenom', resizeable: true, filter: true, width: 120, },
    { field: 'contact', resizeable: true, filter: 'agNumberColumnFilter',width: 150, },
    { field: 'profession', resizeable: true,width: 150, },
    { field: 'religion', resizeable: true,width: 150, },
    { field: 'sexe', resizeable: true,width: 150, },
    { field: 'Date', resizeable: true, headerName: "Détail", cellRenderer: (Numero) => <CellBtn num={Numero.data} /> },
  ])



  return (
    <div className="ag-theme-alpine" style={{ height: '60vh', width: '100%' }}>

      <label className='hidden' id="patient-popup" htmlFor="patient-detail-modal"></label>

      <input type="checkbox" id="patient-detail-modal" className="modal-toggle" />
      <div className="modal backdrop-blur-sm">
        <div className="modal-box md:w-10/12 h-xl max-w-5xl h-auto">

          <Details />

          
        </div>
      </div>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}

      >
      </AgGridReact>
    </div>
  )
}

export default Patients
