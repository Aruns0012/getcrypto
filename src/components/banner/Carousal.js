
import { makeStyles } from '@material-ui/styles'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
    carousal: {
        height: '50%',
        display: 'felx',
        alignitems: 'center'
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      },
}));

    export function numberWithComma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

const Carousal = () => {
    const [trending, settrending] = useState([])


    const classes = useStyles();

    const { currency , symbol} = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        settrending(data)
    };

    // console.log(trending);
    useEffect(() => {

        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                className={classes.carouselItem}
                to={`/coin/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.img}
                    height='80'
                    style={{ marginBottom: 10 }}
                />
                <span>{coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color:profit > 0 ? '#ffd700' :'red',
                            fontWeight : 500,
                        }}
                    >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span style={ {
                    fontSize:22, fontWeight:500}}>
                        {symbol} {numberWithComma(coin?.current_price.toFixed(2))}
                    </span>


            </Link>

        )
    })

    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        },
    };

    return (
        <div className={classes.carousal}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls
            />


        </div>
    )
}

export default Carousal