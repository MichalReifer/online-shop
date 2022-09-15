import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCakes } from "../redux/slices/cakesSlice";
import { useSelector, useDispatch } from 'react-redux'
import Loading from "./Loading";
import Error from "./Error";

const Home = () => {

    const CAKES_IN_LINE = 5
    const LINES_ON_START = 3
    const searchForm = document.querySelector('.search-form')
    const [searchValue, setSearchValue] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [displayCakes, setDisplayCakes] = useState([])
    const [page, setPage] = useState(LINES_ON_START)
    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)

    useEffect(()=>{
        if (searchForm)
            searchForm.addEventListener('submit', e=>{
                e.preventDefault();
                setSearchValue(searchForm.term.value.trim().toLowerCase())
            })
    }, [searchForm])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*LINES_ON_START }, {signal}))
            .then(data=>{
                if(signal.aborted) 
                    setDisplayCakes(data.payload)
            })
        return () => controller.abort()
    }, [dispatch])

    useEffect(()=>{
        dispatch(fetchCakes({ limit: CAKES_IN_LINE*LINES_ON_START, value: searchValue }))
            .then(data=>setDisplayCakes(data.payload))
    }, [searchValue])

    const fetchData = () => {
        console.log('reached end of page')
        dispatch(fetchCakes({ page, limit: CAKES_IN_LINE , value: searchValue}))
            .then(data=>{
                if (data.payload.length < CAKES_IN_LINE) setHasMore(false)
                return data.payload
            })
            .then(moreCakes=>setDisplayCakes([...displayCakes, ...moreCakes]))
            .then(()=> setPage(page+1))
    }

    return (
        <div className="home">

            <form className="search-form">
                <input type="text" name="term" placeholder="search cakes" />
            </form>

            { displayCakes && 
                <InfiniteScroll
                    dataLength={displayCakes.length}
                    next={fetchData}
                    hasMore={hasMore}
                >
                    <div className="products">
                        {displayCakes.map(cake => (
                            <div className="product-preview" key={cake.cakeId}>
                                <Link className='link' to={{pathname:`/products/${cake.cakeId}`, state:{ gotFrom: 'home'}}}>
                                    <img src={'data:image/png;base64,'+cake.image} width='100px'></img>
                                    <h2>{cake.title}</h2>
                                    <p className="price">{cake.price} ₪</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            }

            <Loading isLoading={cakes.loading} />
            <Error isError={(!cakes.loading && cakes.error)} errorMessage={cakes.error}/>

        </div>
    );
}

export default Home;
