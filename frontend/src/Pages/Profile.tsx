import React, { useEffect, useState } from 'react';
import { useAppDispatch,useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useGetUserProfileQuery, useSetUserProfileMutation } from '../redux/api/userApi'
import { UserProfileSchema } from '../Schemas/UserProfileSchema';
import { setUserProfile } from '../redux/slices/UserSlice';

const defaultAvatar = '/path/to/default/avatar.png'; // Path to your default avatar image

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.user.id);
  const username=useAppSelector((state: RootState)=>state.user.username)
  console.log(userId)
  const email=useAppSelector((state: RootState)=>state.user.email)
  const { data: userProfile, error, isLoading } = useGetUserProfileQuery(userId || '');
  const [updateUserProfile]=useSetUserProfileMutation();
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<{ id: number, name: string }[]>([]); // Assuming teams data structure

  useEffect(() => {
    if (userProfile) {
      dispatch(setUserProfile(userProfile));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    // Fetch available teams (Replace with actual API call if available)
    const fetchTeams = async () => {
      // Mock data for teams, replace with your API call
      const teamsData = [
        { id: 1, name: 'Team A' },
        { id: 2, name: 'Team B' },
        { id: 3, name: 'Team C' },
      ];
      setTeams(teamsData);
    };

    fetchTeams();
  }, []);

  const handleUpdateProfile = async (updatedProfile: Partial<UserProfileSchema>) => {
    try {
      const result = await updateUserProfile({ userId: userId!, ...updatedProfile }).unwrap();
      dispatch(setUserProfile(result));
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = parseInt(event.target.value, 10);
    setSelectedTeam(teamId);
    handleUpdateProfile({ teamId });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user profile</div>;

  return (
    <div>
      <h1>{username}</h1>
      <img 
        src={userProfile?.profilePictureUrl || defaultAvatar} 
        alt="Profile" 
        style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
      />
       <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Phone: {userProfile?.phoneNumber}</p>
      <div>
        <label htmlFor="team-select">Choose a team:</label>
        <select 
          id="team-select" 
          value={selectedTeam || userProfile?.teamId || ''} 
          onChange={handleTeamChange}
        >
          <option value="">Select a team</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Profile;
