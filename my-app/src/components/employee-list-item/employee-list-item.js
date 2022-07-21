import { Component } from 'react';
import './employee-list-item.css';


class EmployeesListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            increase: false,
            hasLike: false
        }
    }
    onIncrease = () => {
        this.setState(({increase})=>({
            increase: !increase
        }))
    }
    onLike = () => {
        this.setState(({hasLike})=>({
            hasLike : !hasLike
        }))
    }

    render() {
        const {name, salary, onDelete} = this.props;
        const {increase, hasLike} = this.state;
        let classNames = "list-group-item d-flex justify-content-between";
        if (increase) {
            classNames += ' increase'
        } 
        
        if (hasLike) {
            classNames += ' like'
        }

 
       return (
        <li className={classNames}>
            <span onClick= {this.onLike} className='list-group-item-label'>{name}</span>
            <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button onClick = {this.onIncrease} type="button"
                    className="btn-cookie btn-sm ">
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fa-solid fa-star"></i>
            </div>
        </li>
    )
    }
    
    
}

export default EmployeesListItem;