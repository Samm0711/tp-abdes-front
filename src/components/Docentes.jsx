import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Docentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [titulo, setTitulo] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [DNI, setDNI] = useState('');
  const [telefono, setTelefono] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/docentes')
      .then((response) => setDocentes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const agregarDocente = () => {
if (editId) {
    // Editar docente existente
    axios.put(`http://localhost:5000/api/docentes/${editId}`, { nombre, apellido, titulo, especialidad, DNI, telefono, genero, email })
      .then((response) => {
        alert(response.data.message);
        setDocentes(docentes.map(docente => 
          docente.id === editId ? { id: editId, nombre, apellido, titulo, especialidad, DNI, telefono, genero, email } : docente
        ));
        setEditId(null);
        setNombre('');
        setApellido('');
        setTitulo('');
        setEspecialidad('');
        setDNI('');
        setTelefono('');
        setGenero('');
        setEmail('');
      })
      .catch((error) => console.error(error));
  } else {
    // Agregar nuevo docente
    axios.post('http://localhost:5000/api/docentes', { nombre, apellido, titulo, especialidad, DNI, telefono, genero, email })
      .then((response) => {
        alert(response.data.message);
        setDocentes([...docentes, { id: response.data.id, nombre, apellido, titulo, especialidad, DNI, telefono, genero, email }]);
        setNombre('');
        setApellido('');
        setTitulo('');
        setEspecialidad('');
        setDNI('');
        setTelefono('');
        setGenero('');
        setEmail('');
      })
      .catch((error) => console.error(error));
  }
};

const editarDocente = (docente) => {
  setEditId(docente.id);
  setNombre(docente.nombre);
  setApellido(docente.apellido);
  setTitulo(docente.titulo);
  setEspecialidad(docente.especialidad);
  setDNI(docente.DNI);
  setTelefono(docente.telefono);
  setGenero(docente.genero);
  setEmail(docente.email);
};      


const generarArchivoRelaciones = (id) => {
  axios.get(`http://localhost:5000/api/docentes/${id}/relaciones`)
    .then((response) => {
      alert(response.data.message);

      // Crea un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = response.data.fileUrl;
      link.download = `relaciones_docente_${id}.txt`;
      link.click();
    })
    .catch((error) => console.error(error));
};

  const eliminarDocente = (id) => {
    axios.delete(`http://localhost:5000/api/docentes/${id}`)
      .then((response) => {
        alert(response.data.message);
        setDocentes(docentes.filter(docente => docente.id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='Contenedores'>
        <h2>Docentes</h2>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" />
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="titulo" />
                <input type="text" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} placeholder="especialidad de titulo" />
                <input type="text" value={DNI} onChange={(e) => setDNI(e.target.value)} placeholder="Dni" />
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="telefono" />
                {/* <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder="genero" /> */}
                <select value={genero} onChange={e => setGenero(e.target.value)}>
                   <option value="masculino">Masculino</option>
                   <option value="femenino">Femenino</option>
                </select>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
         <button onClick={agregarDocente}>{editId ? 'Actualizar Docente' : 'Agregar Docente'}</button>
      <ul>
      {docentes.map((docente) => (
       <li key={docente.id}>
        <div className='dato'>
          {docente.nombre} 
           {docente.apellido} - {docente.titulo} - {docente.especialidad} - {docente.DNI} - {docente.telefono} - {docente.genero} - ({docente.email}) <br />
          <button onClick={() => editarDocente(docente)}>Editar</button>
          <button onClick={() => eliminarDocente(docente.id)}>Eliminar</button>   
          <button onClick={() => generarArchivoRelaciones(docente.id)}>Generar Archivo de Relaciones</button>  
          </div>
       
        </li> 
      ))}
    </ul>
  </div>
  );
};

export default Docentes;
