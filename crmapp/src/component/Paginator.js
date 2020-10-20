import React, { Component} from 'react'

class Paginator extends Component {
    state = {
        paginator: {
            /* Al total de clientes lo dividimos entre el limite y el resultado lo redondeamos hacia arriba.*/
            pages: Math.ceil(this.props.totalClients / this.props.limit)
        }
    }
    render(){
        const {actual} = this.props
        const btnPrev = (actual > 1) ? <button className="btn btn-success mr-2" onClick={this.props.prevPage}>&laquo; Anterior</button> : '';

        /* sacamos la cantidad de paginas que hay en el statge*/
        const {pages} = this.state.paginator
        const btnNext = (actual !== pages) ? <button className="btn btn-success" onClick={this.props.nextPage}>Siguiente &raquo;</button> : '';
        return(
            <div className="d-flex justify-content-center mt-5">
                {btnPrev}
                {btnNext}
            </div>
        )
    }
}
export default Paginator