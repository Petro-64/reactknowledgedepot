import React from 'react';
import axios from 'axios';
import helpers from '../../helpers/Helpers';

export default class SubjectsList extends React.Component{
    state = {
        persons: [],
    }

    componentDidMount(){
        let BaseUrl = helpers.UrlSniffer();
        let jwtToken = localStorage.getItem("jwtToken");
        const headers = {
            'JWToken': jwtToken
        }
        axios.get(BaseUrl + 'react/subjects', {
            headers: headers
        })
        .then(res => {
            this.setState({persons: res.data})
        })
    }

    render(){
        return(
            <ul>
                {this.state.persons.map(person => <li key={person.id}>{person.name}</li>)}
            </ul>
        )
    }

}
