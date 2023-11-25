import React from "react";
import { Grid, Box, Stack } from "@mui/material"

export default function Guide(){
  return(
     <Box paddingTop="50px"  paddingBottom="100px" style={{ backgroundColor:'#F5F7FB' }}>
      <Grid container spacing={10} justifyContent="center" alignItems="center">
        <Grid item>
      <img src="/images/guide1.png" alt="" />
      </Grid>
      <Grid item>
      <img src="/images/guide2.png" alt="" />
      </Grid>
      <Grid item>
      <img src="/images/guide3.png" alt="" />
      </Grid>
    </Grid>
     </Box>
  )
  
}