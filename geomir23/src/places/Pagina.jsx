import React from 'react'
import { useSelector } from 'react-redux';
import PaginasLink from './PaginasLink';
const Pagina = () => {
    const { pages } = useSelector((state) => state.places);
    console.log("Pages="+pages)


    return (
        <div>
            {pages.map((page,i) => (
                <p key={i}>
                    <PaginasLink page={page}/>
                </p>
            ))}

        </div>
    )
}

export default Pagina
