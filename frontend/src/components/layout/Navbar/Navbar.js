import {AppBar, Toolbar, IconButton, Stack, Button} from "@mui/material";
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/img/logo.png';

const Navbar = () => {
    return (
       <AppBar position='static'>
            <Toolbar>
                <IconButton size={'large'} edge={'start'} color={'inherit'}>
                    <NavLink to={'/'}>
                        <img src={logo} width={'35px'} alt={'Logo SHC'}/>
                    </NavLink>
                </IconButton>
                <Stack direction={'row'} spacing={2}>
                    <Button component={NavLink} to={'/'} color={'inherit'}>
                        Home
                    </Button>

                    <Button component={NavLink} to={'/certificados'} color={'inherit'}>
                        Certificados
                    </Button>

                    <Button component={NavLink} to={'/painel'} color={'inherit'}>
                        Painel
                    </Button>

                    <Button component={NavLink} to={'/alunos'} color={'inherit'}>
                        Alunos
                    </Button>

                    <Button component={NavLink} to={'/atividades'} color={'inherit'}>
                        Atividades
                    </Button>
                </Stack>
            </Toolbar>
       </AppBar>
    )
}

export default Navbar;