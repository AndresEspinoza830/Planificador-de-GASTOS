import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'    //No se necesita poner el nombre dle archivo proque es un index.js
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );                    //Variable para controlar el presupuesto que ingrese el usuario(validado en NuevoPresupuesto)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);   //Si el presupuesto es valido de muestra ControlPresupuesto y el logo del + , al incio muestra NuevoPresupuesto

  const [modal, setModal] = useState(false)                   //Cuando le den click al logo +, cambiara a true el modal y se mostrara
  const [animarModal, setAnimarModal] = useState(false)       //Para que el formulario aparezca con clases dinamica en Modal 

  const [gastos, setGastos] = useState(                 //Se guardara los objetos de las variables del formulario en un arreglo
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})       //la funcion recibe el objeto en el componente Gasto cuando le da editar
  const [filtro, setFiltro] = useState('')  //No se filtra como arreglo porque solo filtrara una opcion
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);         //Primero se muestra el modal y luego el formulario
      setTimeout(() => {
        setAnimarModal(true)
      }, 300)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);         //Primero se muestra el modal y luego el formulario
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 300)
  }

  const guardarGasto = gasto => {               //Recibe como parametro un objeto con los valores del formulario de Modal
    if (gasto.id) {
      //Actulizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})     //Es buena practica resetear los states
    } else {
      gasto.id = generarId();                     //Se crea el id desde la funcion helpers
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);

    }
    //Se añade cada objeto con las variables del formulario

    setAnimarModal(false);                      //Se oculta  el formulario con la animacion al guardar el objeto en el array de gastos
    setTimeout(() => {
      setModal(false);
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos                     /* El componente se creo despues de Modal */
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )
      }

      {modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

    </div>
  )
}

export default App
