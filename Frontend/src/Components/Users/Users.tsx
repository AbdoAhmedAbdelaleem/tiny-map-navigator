import Layout from "../Shared/Layout"
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../State';
import { bindActionCreators } from 'redux'
import { State } from '../../State';
import { useEffect } from 'react';

export const Users = () => {
  const dispatch = useDispatch();
  const { GetUsers } = bindActionCreators(actionCreators, dispatch);
  const { data } = useSelector((state: State) => state.Users);

  useEffect(() => {
    // Use the useEffect hook to make the API call when the component mounts
    GetUsers();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Layout />
      <table id="example" className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <td>{e.email}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Users