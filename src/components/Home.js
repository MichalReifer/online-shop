import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchCakes } from "../redux/slices/cakesSlice";
import { useSelector, useDispatch } from 'react-redux'

const Home = (props) => {

    const [hasMore, setHasMore] = useState(true)
    const [displayCakes, setDisplayCakes] = useState([])
    const [page, setPage] = useState(2)

    const dispatch = useDispatch()
    const cakes = useSelector(state => state.cakes)

    useEffect(()=>{
        dispatch(fetchCakes({limit:10}))
    }, [dispatch])

    useEffect(()=>{
        setDisplayCakes([...displayCakes, ...cakes.cakes])
    }, [cakes.cakes])

    const fetchData = () => {
        console.log('reached end of page')
        dispatch(fetchCakes({page, limit:5}))
        setPage(page+1) 
        console.log('length: ',cakes.cakes.length)
        if (cakes.cakes.length < 5) setHasMore(false)
    }
    // console.log(cakes)
    // console.log(displayCakes)
    // console.log(page)

    return (
        <div className="home">
            <InfiniteScroll
                dataLength={displayCakes.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                scrollThreshold={1}
                >
                <ProductPreview products={displayCakes}/>
            </InfiniteScroll>

            {/* {cakes.loading && <div>Loading...</div>}
            {(!cakes.loading && cakes.error) ? <div>Error: {cakes.error}</div>: null}
            { (!cakes.loading && cakes.cakes.length) ?
                <ProductPreview products={cakes.cakes}/>
                : null  
            } */}

        </div>
    );
}
 
export default Home;
