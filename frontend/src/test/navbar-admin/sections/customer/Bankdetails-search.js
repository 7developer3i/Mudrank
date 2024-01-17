import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import AuthContext from '../../../../context/AuthContext';
import { useContext } from 'react';

export const CustomersSearch = () => {
  const authcontext = useContext(AuthContext);
  const { banksearch, setBankSearch} = authcontext;
  return(<>
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer" onChange={(e)=>setBankSearch(e.target.value)}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>

  </>)
}

