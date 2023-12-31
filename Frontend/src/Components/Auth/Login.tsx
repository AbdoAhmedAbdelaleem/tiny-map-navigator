import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../State';
import { bindActionCreators } from 'redux'
import { State } from '../../State';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { Login } = bindActionCreators(actionCreators, dispatch);
  const { IsSuccess, IsInvoked } = useSelector((state: State) => state.Auth);

  const HandleLogin = () => {
    Login({ email, password });
  }

  console.log(IsSuccess)
  // useEffect to check authentication status and redirect if already authenticated
  const navigate = useNavigate();
  useEffect(() => {
    // If user is already authenticated and the login page is invoked,
    // redirect them to another route (e.g., /dashboard)
    if (IsSuccess && IsInvoked) {
      navigate('/map');
    }
  }, [IsSuccess, IsInvoked, navigate]);

  // If user is already authenticated, redirect them to another route (e.g., /dashboard)
  useEffect(() => {
    if (IsSuccess) {
      navigate('/map');
    }
  }, [IsSuccess, navigate]);

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    {/* Email */}
                    <div className="form-outline form-white mb-4">
                      <input type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label">Email</label>
                    </div>

                    {/* Password */}
                    <div className="form-outline form-white mb-4">
                      <input type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <input type="submit"
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={HandleLogin}
                      value={'Login'}
                    />

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>

                    <div>
                      <p className='text text-danger'>{(!IsSuccess && IsInvoked) && <p>Authentication Failed</p>}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
