import { Container, makeStyles, Typography } from '@material-ui/core'
import Carousal from './Carousal'
import React from 'react'

const useStyles = makeStyles(()=>({
    banner: {
        backgroundImage:'url(./cryptobanner.jpg)',
    },
    bannerContent:{
        height:400,
        display:'flex',
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    },
    tagline:{
        display:'flex',
        height:'40%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom: '10px',
        // textAlign:'center', 
        // border: '1px solid black',
    }
}));

const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:'bold',
                    marginBottom: 15,
                    fontFamily: 'montserrat',
                    marginTop: 100,
                }}
                >Begening</Typography>
                
            </div>
            <Carousal style={{marginTop:"50"}}/>
        </Container>
    </div>
  )
}

export default Banner