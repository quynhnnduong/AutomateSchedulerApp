import React, { Component } from 'react';
import {
    Container, CardHeader, Card, CardBody
} from 'reactstrap';
import CourseListTable from "./CourseList"


class MyComponent extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state={
                showModal: false,
                name: null, //For capturing user input
                description: null, //For capturing user input
                details: null,
                isOpen: false,
                ClassList: [],
                data: this.fetchData,
                testMessage: ""}
    }

    updateData = (apiResponse) => {
            console.log(apiResponse)
            this.setState({ClassList:apiResponse})
    }

    updateSelected = (apiResponse) => {
        console.log(apiResponse)
        this.setState({ data: apiResponse })
    }
    
    fetchData = () => {
        //In package.json add "proxy": "http://localhost:5000"
        //This will allow redirect to REST api in Flask w/o CORS errors
         fetch('/coursedata', {method:'GET'})
         .then(
             response => response.json()
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                      this.updateData(jsonOutput)
                    }
              )
      }
    
    update = (course_id, name, c_desc, details, department_id) => {
        //In package.json add "proxy": "http://localhost:5000"
        //This will allow redirect to REST api in Flask w/o CORS errors
        fetch('/coursedata/' + course_id, { 
            method: 'PUT',
            body:  JSON.stringify({
                name: name,
                c_desc: c_desc,
                details: details,
                dept_id: department_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(
                response => response.json()
            )//The promise response is returned, then we extract the json data
            .then(() => {
                this.fetchData()
            }
            )
    }
    add = (course_id, name, c_desc, details, department_id) => {
        //In package.json add "proxy": "http://localhost:5000"
        //This will allow redirect to REST api in Flask w/o CORS errors
        fetch('/coursedata/', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                c_desc: c_desc,
                details: details,
                dept_id: department_id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(
                response => response.json()
            )//The promise response is returned, then we extract the json data
            .then(() => {
                this.fetchData()
            }
            )
    }


    componentDidMount(){
        this.fetchData();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        {/*If the data has not yet been loaded from the server, return empty page */}
        if ( this.state.data == null )
        return (<div>No data</div>)
        else
        {
        return (
            <div className='m-4'>
                <Card>
                    <CardHeader style={{ textAlign: "center" }}>
                        Course List 
                    </CardHeader>
                    <CardBody>
                        <Container>
                      
                                <CourseListTable ClassList={this.state.ClassList} ClassID={this.getSelected}/>
                  
                        </Container>
                    </CardBody>
                </Card>
                {/* </div> */}
            </div>
        )
        }
    }
}

export default MyComponent;