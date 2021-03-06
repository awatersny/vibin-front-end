import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import * as instrumentService from '../../services/instrumentService'
import * as genreService from '../../services/genreService'
import * as profileService from '../../services/profileService'
import * as bandService from '../../services/bandService'

const AddBand = ({ user, handleLogout }) => {
  const formElement = useRef()
  const navigate = useNavigate()
  const [genreId, setGenreId] = useState('')
  const [instrumentId, setInstrumentId] = useState('')
  const [memberId, setMemberId] = useState('')
  const [instruments, setInstruments] = useState([])
  const [genres, setGenres] = useState([])
  const [profiles, setProfiles] = useState([])
  const [validForm, setValidForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    genres: [],
    creator: '',
    instruments: [],
    members: [],
    zip: ''
  })

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleGenreChange = evt => {
    setGenreId(evt.target.value)
  }

  const handleInstrumentChange = evt => {
    setInstrumentId(evt.target.value)
  }

  const handleMemberChange = evt => {
    setMemberId(evt.target.value)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    try {
      bandService.create(formData)
      navigate('/createBand')
      setFormData({
        name: '',
        photo: '',
        genres: [],
        creator: '',
        instruments: [],
        members: [],
        zip: ''
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handlePushGenre = evt => {
    if(genreId) setFormData({...formData, genres: [...formData.genres, genreId]})
  }
  
  const handlePushInstrument = evt => {
    if(instrumentId) setFormData({...formData, instruments: [...formData.instruments, instrumentId]})
  }

  const handlePushMember = evt => {
    if(memberId) setFormData({...formData, members: [...formData.members, memberId]})
  }

  useEffect(() => {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  useEffect(() => {
    instrumentService.getAllInstruments()
    .then(instrumentData => setInstruments(instrumentData))
  }, [])

  useEffect(() => {
    genreService.getAllGenres()
    .then(genreData => setGenres(genreData))
  }, [])

  useEffect(() => {
    profileService.getAllProfiles()
    .then(profileData => setProfiles(profileData))
  }, [])

  return ( 
    <main className='card full-page-card column-container whitebg margin-top'>
      <NavBar user={user} handleLogout={handleLogout} />
      <div className='card edge-card column-container svgbg'>
        <h1 className='whitefnt pacifico margin-btm'>Create a Band</h1>
        <form
          className="asap item-card"
          autoComplete="off"
          ref={formElement}
          onSubmit={handleSubmit}
        >
        <table className="column-container" cellPadding={4}>
          <tbody>
            <tr>
              <td className='whitefnt asap labels'>Name</td>
              <td>
                <input
                  className='form-control asap inputs text-truncate'
                  type="text"
                  autoComplete="off"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Name (Required)"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className='whitefnt asap labels'>Genres</td>
              {genres.length ?
              <><td className="inputs">
                <select 
                  id="genres"
                  className="asap inputs text-truncate"
                  value={genreId}
                  name="genres"
                  onChange={handleGenreChange}
                >
                  <option value=''>--Choose--</option>
                  {genres.map(genre => {
                    return <option key={genre._id} value={genre._id}>{genre.name}</option>
                  })}
                </select>
              </td>
              <td>
                <button type="button" className="asap add-button" onClick={handlePushGenre}>+</button>
              </td></>
              : 
              <td className='blackfnt asap inputs whitebg'>Loading...</td>
              }
            </tr>
            <tr>
              <td className='whitefnt asap labels'>Instruments</td>
              {instruments.length ?
              <><td>
                <select 
                  id='instruments'
                  className="asap inputs"
                  value={instrumentId}
                  name="instruments"
                  onChange={handleInstrumentChange}
                >
                  <option value=''>--Choose--</option>
                  {instruments.map(instrument => {
                    return <option key={instrument._id} value={instrument._id}>{instrument.name}</option>
                  })}
                </select>
                </td>
                <td>
                  <button type="button" className="asap add-button" onClick={handlePushInstrument}>+</button>
                </td></>
              : 
              <td className='blackfnt asap inputs whitebg'>Loading...</td>
              }
            </tr>
            <tr>
              <td className='whitefnt asap labels'>Members</td>
              {instruments.length ?
              <><td>
                <select 
                  id='members'
                  className="asap inputs"
                  value={memberId}
                  name="members"
                  onChange={handleMemberChange}
                >
                  <option value=''>--Choose--</option>
                  {profiles.map(profile => {
                    return <option key={profile._id} value={profile._id}>{profile.name}</option>
                  })}
                </select>
                </td>
                <td>
                  <button className="add-button" type="button" onClick={handlePushMember}>+</button>
                </td></>
              : 
              <td className='blackfnt asap inputs whitebg'>Loading...</td>
              }
            </tr>
            <tr>
              <td className='whitefnt labels'>Zip Code</td>
              <td>
                <input
                  className='form-control inputs'
                  type="text"
                  pattern="[0-9]*"
                  autoComplete="off"
                  value={formData.zip}
                  name="zip"
                  onChange={handleChange}
                  placeholder="Zip Code (Required)"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className='margin-top'>
          <button
            disabled={!validForm}
            className='margin-2 br padding-2 whitebrdr whitefnt blackbg'
          >
            Create Band
          </button>
          <Link to="/">
            <button className='margin-2 br padding-2 whitebrdr whitefnt blackbg'>Cancel</button>
          </Link>
        </div>
      </form>
      </div>
    </main> 
  );
}

export default AddBand;