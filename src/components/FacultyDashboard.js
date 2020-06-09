import React from 'react'
import { GoogleLogout } from 'react-google-login';

class FacultyDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome Faculty Dashboard</h1>
                <GoogleLogout
                    clientId="399787809549-eukv9vkkje6scsgl80ufmdmgk9ebdnod.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={this.props.logout}
                >
                </GoogleLogout>
            </div>
        )
    }
}

export default FacultyDashboard;