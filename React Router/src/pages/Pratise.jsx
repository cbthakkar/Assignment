import React, { Component } from 'react'


export class Fectdata extends Component {
    state = {
        data: []
    }

    
    async componentDidMount() {
        fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json')
        .then((response) => response.json())
        .then((data) =>  this.setState({ data: data}));
        // try {
        //     const response = await fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json');
        //     const data = await response.json();
        //     console.log(data);
            
        //        ;
        //     }
    
        // catch (err) {
        //     console.log(err);
        // }
    }

    async componentDidUpdate(){
        try {
            const response = await fetch('https://fir-project-30e96-default-rtdb.firebaseio.com/user.json');
            const data = await response.json();
            console.log(data);
                this.setState({ data: data});
            }
    
        catch (err) {
            console.log(err);
        }
    }


  

    render() {
        console.log('render method called');
        const { data } = this.state;
        return (
            <>
                <table className="table table-dark table-hover">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">First</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact no</th>
                    </tr>

                    {Object.values(data).map((item,i = 0) => {
                        return (
                            <tr>
                                <td>{i++}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile}</td>
                            </tr>
                        )
                    })}
                </table>
            </>
        )
    }
}

export default Fectdata