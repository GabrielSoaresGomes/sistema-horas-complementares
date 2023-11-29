import './headermodal.css'

const HeaderModal = (props) => {
    return (
    <div className='headermodal'>
        <p className='titulo'>{props.pagina}</p>
    </div>
    )
}

export default HeaderModal