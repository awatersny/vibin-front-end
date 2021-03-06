import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'


const SignupForm = props => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    photo: '',
    zip: '',
    bio: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const userFormData = new FormData()
    userFormData.append('photo', formData.photo)
    userFormData.append('name', formData.name)
    // props.handleAddUser(userFormData)
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const handleChangePhoto = (evt) => {
    setFormData({...formData, photo: evt.target.files[0]})
  }

  const { name, email, password, passwordConf, photo, zip, bio } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <table cellPadding={3}>
        <tbody>
          <tr>
            <td className='whitefnt labels asap labels asap'>Name</td>
            <td>
              <input
                className="inputs asap"
                type="text"
                autoComplete="off"
                id="name"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className='whitefnt labels asap labels asap'>Email</td>
            <td>
              <input
                className="inputs asap"
                type="text"
                autoComplete="off"
                id="email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className='whitefnt labels asap'>Password</td>
            <td>
              <input
                className="inputs asap"
                type="password"
                autoComplete="off"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className='whitefnt labels asap'>Confirm Password</td>
            <td>
              <input
                className="inputs asap"
                type="password"
                autoComplete="off"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className='whitefnt labels asap'>Profile Photo</td>
            <td>
              <input
                className="inputs asap"
                type="text"
                autoComplete="off"
                id="photo"
                value={photo}
                name="photo"
                onChange={handleChange}
                placeholder="paste image address"
              />
            </td>
          </tr>
          <tr>
            <td className='whitefnt labels asap'>What is your zip code?</td>
            <td>
              <input
                className="inputs asap"
                type="text"
                pattern="[0-9]*"
                autoComplete="off"
                id="zip"
                value={zip}
                name="zip"
                onChange={handleChange}
                placeholder="Zip Code"
              />
            </td>
          </tr>
        <tr>
            <td className='whitefnt labels asap'>Tell us about yourself</td>
            <td>
              <textarea
                className='inputs asap'
                type="text"
                autoComplete="off"
                id="bio"
                value={bio}
                name="bio"
                onChange={handleChange}
                placeholder="bio"
                rows="5"
                maxLength={150}
                />
            </td>
          </tr>
        </tbody>
      </table>
      <div className='margin-top'>
        <button disabled={isFormInvalid()} className='margin-2 br padding-2 whitebrdr whitefnt blackbg'>
          Sign Up
        </button>
        <Link to="/">
          <button className='margin-2 br padding-2 whitebrdr whitefnt blackbg'>Cancel</button>
        </Link>
      </div>

      
    </form>
  )
}


export default SignupForm
