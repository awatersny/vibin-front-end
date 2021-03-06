import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const LoginForm = props => {
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
  })
  const navigate = useNavigate()

  const handleChange = e => {
    props.updateMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <table cellPadding={5}>
        <tbody>
          <tr>
            <td className='whitefnt labels asap'>Email</td>
            <td><input
                type="text"
                className='inputs asap'
                autoComplete="off"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              /></td>
          </tr>
          <tr>
            <td className='whitefnt labels asap'>Password</td>
            <td><input
              type="password"
              autoComplete="off"
              className='inputs asap'
              id="password"
              value={formData.pw}
              name="pw"
              onChange={handleChange}
            /></td>
          </tr>
        </tbody>
      </table>
      <div className='margin-top'>
        <button className='margin-2 br padding-2 whitebrdr whitefnt blackbg'>Log In</button>
        <Link className='margin-2' to="/">
          <button className='padding-2 br whitebrdr whitefnt blackbg'>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm
