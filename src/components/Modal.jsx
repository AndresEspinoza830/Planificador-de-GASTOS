import { useState, useEffect } from 'react';
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [categoria, setCategoria] = useState(0)
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {             //Cuando cargue el formulario se llenaran los datos 
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false);       //Primero se oculta el formulario y luego el modal
        setGastoEditar({})  //Resetea el objeto de los datos
        setTimeout(() => {
            setModal(false);
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('');
            }, 3000)
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha })      //Si sale bien la validacion los datos de los inputs los guardamos en un objeto
        //de la funcion creada en App.jsx
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">       {/*Dando click a la X se cierra el Modal*/}
                <img
                    src={CerrarBtn}
                    alt="Cerrar modal"
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar'}`}      //Clase de css dinamica
            >
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del gasto: ej.300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>
        </div>
    )
}

export default Modal