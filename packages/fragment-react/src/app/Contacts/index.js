import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Contacts extends Component {
    render() {
        const {applications} = this.props;

        return (
            applications.map((application, index) => (
                    <div className="recommendation" key={index}>
                        <h3>{application.JobTitle}</h3>
                        <p>{application.Employer}</p>
                        <p>{application.Workplace}</p>

                        <br/>
                        <br/>
                        <br/>

                        <p>{application.OfferUrl}</p>
                    </div>
                )
            )

        );
    }
}

Contacts.propTypes = {applications: PropTypes.any}


const foo = (state) => ({applications: state})

export default connect(foo)(Contacts)
