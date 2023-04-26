import Navbar from "../Navbar/Navbar";

const Skeleton = ({children}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Skeleton;