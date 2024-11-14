import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Relacionar = () => {
  const [docentes, setDocentes] = useState([]);
  const [espacios, setEspacios] = useState([]);
  const [docenteId, setDocenteId] = useState('');
  const [espacioId, setEspacioId] = useState('');
  const [relaciones, setRelaciones] = useState([]);

  useEffect(() => {
    // Obtener docentes y espacios para el formulario de relación
    axios.get('http://localhost:5000/api/docentes')
      .then((response) => setDocentes(response.data))
      .catch((error) => console.error(error));

    axios.get('http://localhost:5000/api/espacios')
      .then((response) => setEspacios(response.data))
      .catch((error) => console.error(error));

    // Obtener relaciones existentes
    axios.get('http://localhost:5000/api/docente_espacio')
      .then((response) => setRelaciones(response.data))
      .catch((error) => console.error(error));
  }, []);

  const relacionarDocenteEspacio = () => {
    if (docenteId && espacioId) {
      axios.post('http://localhost:5000/api/docente_espacio', { docente_id: docenteId, espacio_id: espacioId })
        .then((response) => {
          alert(response.data.message);
          // Actualizar el estado con la nueva relación
          setRelaciones([...relaciones, { docente_id: docenteId, espacio_id: espacioId }]);
        })
        .catch((error) => console.error(error));
    } else {
      alert('Por favor, selecciona un docente y un espacio curricular.');
    }
  };

  const eliminarRelacion = (docenteId, espacioId) => {
    axios.delete(`http://localhost:5000/api/docente_espacio/${docenteId}/${espacioId}`)
      .then((response) => {
        alert(response.data.message);
        // Eliminar la relación del estado
        setRelaciones(relaciones.filter(rel => !(rel.docente_id === docenteId && rel.espacio_id === espacioId)));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='Contenedores'>
      <h2>Relacionar Docente con Espacio Curricular</h2>
      <div>
        <label htmlFor="docente">Docente:</label>
        <select id="docente" value={docenteId} onChange={(e) => setDocenteId(e.target.value)}>
          <option value="">Seleccionar Docente</option>
          {docentes.map(docente => (
            <option key={docente.id} value={docente.id}>{docente.nombre} {docente.apellido}</option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="espacio">Espacio Curricular:</label>
        <select id="espacio" value={espacioId} onChange={(e) => setEspacioId(e.target.value)}>
          <option value="">Seleccionar Espacio Curricular</option>
          {espacios.map(espacio => (
            <option key={espacio.id} value={espacio.id}>{espacio.nombre}-{espacio.curso}°{espacio.division}</option>
          ))}
        </select>
      </div>

      <button onClick={relacionarDocenteEspacio}>Relacionar</button>

      <h3>Relaciones Existentes</h3>
      <ul>
        {relaciones.map((relacion, index) => {
          const docente = docentes.find(d => d.id === relacion.docente_id);
          const espacio = espacios.find(e => e.id === relacion.espacio_id);

          if (!docente || !espacio) return null; 

          return (
            <li key={index}>   <div className='dato'>
              Docente: {docente.nombre} {docente.apellido} -
              Espacio: {espacio.nombre} -
              Turno: {espacio.turno} -
              Horas asignadas: {espacio.cargahoraria} 
              <button onClick={() => eliminarRelacion(relacion.docente_id, relacion.espacio_id)}>
                Eliminar Relación
              </button></div> <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Relacionar;
