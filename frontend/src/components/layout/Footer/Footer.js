import './footer.css';

import facebook from '../../../assets/img/facebook.png';
import instagram from '../../../assets/img/instagram.png';
import twitter from '../../../assets/img/x.png';

const Footer = () => {
    return (
        <footer>
            <h2>CODEPLUS</h2>
            <div>
                <img src={facebook}/>
                <img src={instagram}/>
                <img src={twitter}/>
            </div>
            <p>2023 all Right Reserved Term of use CODE+</p>
        </footer>
    );
}

export default Footer;