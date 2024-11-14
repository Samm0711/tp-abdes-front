import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Espacios = () => {
  const [espacios, setEspacios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [curso, setCurso] = useState('');
  const [division, setDivision] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [turno, setTurno] = useState('mañana');
  const [vacante, setVacante] = useState('disponible');
  const [cargahoraria, setCargahoraria] = useState('');
  const [editId, setEditId] = useState(null);
 

  useEffect(() => {
    axios.get('http://localhost:5000/api/espacios')
      .then((response) => setEspacios(response.data))
      .catch((error) => console.error(error));
  }, []);



  const agregarEspacio = () => {
if (editId) {
    // Editar espacio existente
    axios.put(`http://localhost:5000/api/espacios/${editId}`, { nombre, curso, division, especialidad, turno, vacante, cargahoraria  })
      .then((response) => {
        alert(response.data.message);
        setEspacios(espacios.map(espacio => 
          espacio.id === editId ? { id: editId, nombre, curso, division, especialidad, turno, vacante, cargahoraria  } : espacio
        ));
        setEditId(null);
        setNombre('');
        setCurso('');
        setDivision('');
        setEspecialidad('');
        setTurno('');
        setVacante('');
        setCargahoraria('');
      })
      .catch((error) => console.error(error));
  } else {
    // Agregar nuevo espacio
    axios.post('http://localhost:5000/api/espacios', { nombre, curso, division, especialidad, turno, vacante, cargahoraria  })
      .then((response) => {
        alert(response.data.message);
        setEspacios([...espacios, { id: response.data.id,  nombre, curso, division, especialidad, turno, vacante, cargahoraria }]);
        setNombre('');
        setCurso('');
        setDivision('');
        setEspecialidad('');
        setTurno('');
        setVacante('');
        setCargahoraria('');
      })
      .catch((error) => console.error(error));
  }
};

const editarEspacio = (espacio) => {
  setEditId(espacio.id);
  setNombre(espacio.nombre);
  setCurso(espacio.curso);
  setDivision(espacio.division);
  setEspecialidad(espacio.especialidad);
  setTurno(espacio.turno);
  setVacante(espacio.vacante);
  setCargahoraria(espacio.cargahoraria);
};


  const eliminarEspacio = (id) => {
    axios.delete(`http://localhost:5000/api/espacios/${id}`)
      .then((response) => {
        alert(response.data.message);
        setEspacios(espacios.filter(espacio => espacio.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='Contenedores'>
    <h2>Espacios Curriculares</h2>
    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del espacio" />
    <input type="text" value={curso} onChange={(e) => setCurso(e.target.value)} placeholder="curso" />
    <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} placeholder="division" />
    <input type="text" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} placeholder="especialidad" />
    <select value={turno} onChange={e => setTurno(e.target.value)}>
        <option value="mañana">Mañana</option>
        <option value="tarde">Tarde</option>
        <option value="vespertino">Vespertino</option>
      </select>
      <select value={vacante} onChange={e => setVacante(e.target.value)}>
        <option value="disponible">Disponible</option>
        <option value="no disponible">No disponible</option>
      </select>
    <input type="text" value={cargahoraria} onChange={(e) => setCargahoraria(e.target.value)} placeholder="horas asignadas" />
    <button onClick={agregarEspacio}>{editId ? 'Actualizar Espacio' : 'Agregar Espacio'}</button>
   <ul>
      {espacios.map((espacio) => (
         <li key={espacio.id}>
          <div className='dato'>
          {espacio.nombre} -  {espacio.curso} ° {espacio.division} - {espacio.especialidad} - {espacio.turno} - {espacio.vacante} - {espacio.cargahoraria} <br />
          <button onClick={() => editarEspacio(espacio)}>Editar</button>
          <button onClick={() => eliminarEspacio(espacio.id)}>Eliminar</button> 
          </div> <br />
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Espacios;
