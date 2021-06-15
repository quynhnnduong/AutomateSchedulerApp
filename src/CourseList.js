import React from 'react';
import {
    Button, Table, ModalHeader,
    Modal, ModalBody, ModalFooter, Input, Label,

} from 'reactstrap';
import './index.css'


class CourseListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ClassList: this.props.ClassList, ClassID: this.props.ClassID, ClassName: this.props.ClassName, ClassDetails: this.props.ClassDetails,
            IsAdded: "False",
            AddedColor: this.props.selected === true ? "Green" : "InactiveBorder",
            AddedBorderWidth: this.props.selected === true ? "5px" : "3px",
            NewTodo: "",
            selected: this.props.selected,
            // displayModal: this.state.displayModal
        }
    }

    

    handleAdd = () => {
        this.setState({
            showModal: true
        })
    }

    handleCancel = () => {
        this.setState({
            showModal: false,
            name: null,
            description: null,
            details: null
        })
    }
    handleOk = () => {
        this.setState({
            showModal: false
        })
    }

    editClicked = () => {
        this.setState({
            showModal: true
        })
    }

    okClicked = () => {
        this.props.update(this.props.course_id)
        this.setState({
            showModal: true
        })
    }

    cancelClicked = () => {
        this.setState({
            showModal: false,
            name: null,
            description: null,
            details: null,
            department: null
        })
    }
    updateName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    updateDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    updateDetails = (e) => {
        this.setState({
            details: parseInt(e.target.value)
        })
    }

    addName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    addDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    addDetails = (e) => {
        this.setState({
            details: e.target.value
        })
    }

    render() {
        return (
            <Table striped>
                <thead>
                <tr>
                    <th> </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Details</th>
                    <th>Department</th>
                    <th>College</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.ClassList.map((item) => {
                            return(
                                <tr>
                                    <td>
                                        <Button color="primary" onClick={this.handleAdd}>Edit</Button>
                                        <Modal isOpen={this.state.showModal}>
                                            <ModalHeader>Edit Course</ModalHeader>
                                            <ModalBody>
                                                <Label>Course Name</Label>
                                                <Input placeholder={item.name} id="cName" type="text" onChange={this.updateName}></Input>
                                                <Label>Course Description</Label>
                                                <Input placeholder={item.c_desc} id="cDesc" type="text" onChange={this.updateDescription}></Input>
                                                <Label>Course Details</Label>
                                                <Input placeholder={item.details} id="cDetails" type="text" onChange={this.updateDetails}></Input>
                                                <Label>Course Department</Label>
                                                <select onClick={this.updateDepartment}>
                                                    <option value="1">Software Engineering</option>
                                                    <option value="2">Computer Science</option>
                                                    <option value="3">Computer Engineering</option>
                                                    <option value="4">Virology</option>
                                                </select>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.okClicked}>OK</Button>
                                                <Button color="primary" onClick={this.cancelClicked}>Cancel</Button>
                                            </ModalFooter>
                                        </Modal>

                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.c_desc}
                                    </td>
                                    <td>
                                        {item.details}
                                    </td>
                                    <td>
                                        {item.department}
                                    </td>
                                    <td>
                                        {item.college}
                                    </td>
                                </tr>

                            )
                        }
                    )
                }
                <br></br>
                <br></br>
                    <Button color="primary" onClick={this.handleAdd}>Add</Button>
                    <Modal isOpen={this.state.showModal}>
                        <ModalHeader>Add Course</ModalHeader>
                        <ModalBody>
                            <Label>Course Name</Label>
                            <Input id="cName" type="text" onChange={this.addName}></Input>
                            <Label>Course Description</Label>
                            <Input id="cDesc" type="text" onChange={this.addDescription}></Input>
                            <Label>Course Details</Label>
                            <Input id="cDetails" type="text" onChange={this.addDetails}></Input>
                            <Label>Course Department</Label>
                            <select onClick={this.updateDepartment}>
                                <option value="1">Software Engineering</option>
                                <option value="2">Computer Science</option>
                                <option value="3">Computer Engineering</option>
                                <option value="4">Virology</option>
                            </select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleOk}>OK</Button>
                            <Button color="primary" onClick={this.handleCancel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </tbody>
            </Table>
        );
    }
}

export default CourseListTable
