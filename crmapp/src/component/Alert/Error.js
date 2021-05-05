import React from 'react'

const Exit =({error}) => {
    if(error.message){
        error = error.message
    }

    return(<p className="alert alert-danger p-2 mb-2"> {error}</p>)
}

export default Exit