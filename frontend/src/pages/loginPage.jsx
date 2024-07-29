import '../styles/loginPage.css';

const Login = () => {
    return (
        <div className="loginPage">
            <div className="login-box">
                <div className="login-title">
                    <p>Login</p>
                </div>
                <hr/>
                <div className="login-form">
                    <div className="input-box">
                        <label> Email </label>
                        <input type="email" placeholder="Please enter in email format"/>
                    </div>
                    <div className="input-box">
                        <label> Password </label>
                        <input type="password" placeholder="Please enter a password"/>
                    </div>
                    <div>
                        <button>Login</button>  
                    </div>
                </div>
            </div>
            
        </div>

    );
}



export default Login;