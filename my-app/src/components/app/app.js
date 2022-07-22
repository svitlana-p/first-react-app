import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employee-list/employee-list';
import EmployeesAddForm from '../employee-add-form/employee-add-form';
import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John S.', salary: 800, increase: false, rise: false, id:1},
                {name: 'Alex M.', salary: 300, increase: true, rise: false, id:2},
                {name: 'Carl W.', salary: 5000, increase: false, rise: false, id:3},
                {name: 'Henry L.', salary: 700, increase: false, rise: false, id:4}        
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 5
    }
    deleteItem = id => {
        this.setState(({data}) => {           
            return {
                data: data.filter(item =>item.id !== id)
            }

        })
    }
    addItem = (name, salary) => {
        if(!salary || name.length<=3) {
            return
        }
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        // this.setState(({data})=>{
        //     // const index = data.findIndex(elem => elem.id === id);

        //     // const old = data[index];
        //     // const newItem = {...old, increase: !old.increase};
        //     // const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            
        //     // return {
        //     //     data: newArr
        //     // }        
        // })

        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item;
            })
        }))
    }
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }
    onUpdateSearch = term => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {      
        const {data, term, filter} = this.state;  
        const visibleData =this.filterPost(this.searchEmp(data, term), filter);
        return (            
            <div className="app">
               <AppInfo data={this.state.data} />
    
               <div className='search-panel'>
                  <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                  <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>              
               </div>
    
               <EmployeesList data={visibleData} 
               onDelete={this.deleteItem}
               onToggleIncrease={this.onToggleIncrease}
               onToggleRise={this.onToggleRise}/>
               <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}


export default App;