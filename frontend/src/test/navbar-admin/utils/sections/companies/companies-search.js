import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import AuthContext from '../../../../../context/AuthContext';
import { useContext } from 'react';

export const CompaniesSearch = () => {
  const authcontext = useContext(AuthContext);
  const { companysearch, setCompanysearch} = authcontext;
return(
  <>
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search company" onChange={(e)=>setCompanysearch(e.target.value)}
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

