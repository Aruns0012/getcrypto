import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithComma } from './banner/Carousal';

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useNavigate();

    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);

    };

    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency]);


    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        },
    });


    const useStyles = makeStyles(() => ({
        pagination: {
            '& .MuiPaginationItem-root' : {
                color:'gold',
            },
        },
    }));

    const classes = useStyles();

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ));
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: 'center' }}>
                    <Typography variant='h4' style={{ margin: '18px', fontFamily: 'Montserrat' }}>
                        Cryptocurrency Prices by Market Cap
                    </Typography>
                    <TextField label="search " variant='outlined'
                        style={{ marginBottom: 20, width: '100%', color: 'white' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <TableContainer>
                        {
                            loading ? (
                                <LinearProgress style={{ backgroundColor: 'gold' }} />
                            ) : (
                                <Table>
                                    <TableHead style={{ backgroundColor: '#EEEEE' }}>
                                        <TableRow>
                                            {['Coin', 'Price', '24H Change', 'Market Cap'].map((head) => (
                                                <TableCell style={{
                                                    color: 'gold',
                                                    fontWeight: '700',
                                                    fontFamily: 'Montserrat'
                                                }}
                                                    key={head}
                                                    align={head === 'coin' ? "" : 'right'}
                                                >
                                                    {head}

                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {handleSearch().slice((page-1) * 10, (page-1) * 10 + 10).map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;

                                            return (
                                                <TableRow
                                                    onClick={() => history(`/coin/${row.id}`)}
                                                    className={classes.row}
                                                    key={row.name}>
                                                    <TableCell
                                                        component='th'
                                                        scope='row'
                                                        styles={{
                                                            display: 'flex',
                                                            gap: 15
                                                        }}
                                                    >
                                                        <img src={row?.image} alt={row?.name} height='50'
                                                            style={{ marginBottom: 10 }} />
                                                        <div
                                                            style={{ display: 'flex', flexDirection: 'column' }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: 'uppercase',
                                                                    fontSize: 22
                                                                }}
                                                            >{row.symbol}
                                                            </span>
                                                            <span style={{ color: 'darkgray' }}>{row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {symbol}{" "}{numberWithComma(row.current_price)}

                                                    </TableCell>
                                                    <TableCell
                                                        align='right'
                                                        style={{
                                                            color: profit > 0 ? 'rgb(14,203,129)' : 'red',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {profit && '+'}{row.price_change_percentage_24h.toFixed(2)}

                                                    </TableCell>
                                                    <TableCell
                                                        align='right'
                                                        style={{
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {numberWithComma(row.market_cap.toString().slice(0, -6))} M

                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            )
                        }
                    </TableContainer>
                    <Pagination 
                    classes={{ ul:classes.pagination}}
                    count={(handleSearch()?.length / 10).toFixed(0) }
                    onChange={(_, value) =>{
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                    style={{
                        padding:15,
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    />

                    
                </Container>
            </ThemeProvider>
        </>
    )
}

export default CoinsTable