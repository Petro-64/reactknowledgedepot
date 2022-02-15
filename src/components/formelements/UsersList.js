import React from 'react';

class UsersList extends React.Component{
    render(){
        return(
            <ul>
                {this.props.users.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
        )
    }
}

export default UsersList;