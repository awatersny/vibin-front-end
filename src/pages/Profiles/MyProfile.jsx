import { useState, useEffect } from 'react'
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails'
import * as profileService from '../../services/profileService'
import NavBar from '../../components/NavBar/NavBar'
import AddInstrumentToProfile from '../../components/AddInstrumentToProfile/AddInstrumenttoProfile'
import AddGenreToProfile from '../../components/AddGenreToProfile/AddGenreToProfile'

const MyProfile = (props) => {
  const [profile, setProfile] = useState([])

  useEffect(()=> {
    profileService.getProfile(props.user.profile)
    .then(profileData => setProfile(profileData))
  }, [])

  return (
    <>
      <NavBar user={props.user} handleLogout={props.handleLogout} />
      <br />
      <br />
      <br />
      <>
        <div className='margin-2
            edge-card column-container bluebg'>
          <div className='card-body'>
            <h1 className='whitefnt asap margin-top'>{profile.name}</h1>
            <ProfileDetails profile={profile} />
            <AddInstrumentToProfile 
            profileId={props.user.profile}
            getAllInstruments={props.getAllInstruments} />
            <AddGenreToProfile 
            profileId={props.user.profile}
            />
          </div>
        </div>
      </>
    </>
  )
}

export default MyProfile