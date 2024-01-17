import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';

export const CustomersSearch = () => {
  const authcontext = useContext(AuthContext);
  const { paymentSearch,setPaymentSearch} = authcontext;
  return(
    <>
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer" onChange={(e)=>setPaymentSearch(e.target.value)}
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

    </>
  )

      }