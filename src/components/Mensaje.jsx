
const Mensaje = ({ children, tipo }) => {
    return (
        <div className={`alerta ${tipo}`}>{children}</div>    //Clase dinamica
    )
}

export default Mensaje