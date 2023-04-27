import Navbar from "../Navbar/Navbar";

const Skeleton = ({children}) => {
    return (
        <>
            <Navbar />
            <div className='container-fluid'>
                {children}
            </div>
        </>
    )
}

export default Skeleton;