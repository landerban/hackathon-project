import register from '../assets/react.svg'
import '../css/register.css'

export default function Register(props){
    return(
    <div className={props.isDark ? "dark container-fluid" : "container-fluid"}>
        <div className="row vh-100">
            <div className="col-md-6 left-section d-none d-md-flex align-items-center">
                <img src={register} alt="Background Image" className="img-fluid full-height" />
            </div>

            <div className="col-md-6 right-section d-flex align-items-center justify-content-center">
                <div className="signup-form text-center">
                    <h1 className="display-4">BREAK YOUR CHAINS</h1>
                    <h2 className="mt-3">SIGN UP</h2>
                    <p className="text-muted">Sign up for free to have access to our product</p>
                    
                    <form action="#" method="POST">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">register</button>
                    </form>
                    <p className="mt-3 small">Already have an account? <a href="#">Log in</a></p>
                </div>
            </div>
        </div>
    </div>
    )
}