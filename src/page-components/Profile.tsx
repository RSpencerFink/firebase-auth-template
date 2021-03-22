import { FormControlLabel, Switch, Typography } from "@material-ui/core";
import { Context } from "context";
import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ProfileShow } from "components";
import ProfileEdit from "components/Profile/ProfileEdit";

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  margin: 0 auto;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
  }
  .margin-bottom {
    margin-bottom: 8px;
  }
`;

const Profile = () => {
  const { user, userData } = useContext(Context);
  const [edit, setEdit] = useState<boolean>(false);

  if (!user) {
    return null;
  }
  return (
    <ProfilePage>
      <div className="row">
        <Typography variant="h3">Profile</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={edit}
              onChange={(e) => setEdit(e.target.checked)}
              name="Edit"
            />
          }
          label="Edit Profile"
        />
      </div>
      {edit ? (
        <ProfileEdit user={user} userData={userData} setEdit={setEdit} />
      ) : (
        <ProfileShow user={user} userData={userData} />
      )}
    </ProfilePage>
  );
};

export default Profile;
