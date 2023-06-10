import styled from "styled-components/macro";

import { getAccessToken } from "../spotify";
const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
display:inline-block;
background-color:var(--green);
color:var(--white);
border-radious:var(--border-radious-pill);
font:size:var(--fz-lg);
padding:var(--spacing-sm) var(--spacing-xl);

&:hovver,
&:focus{
    text-decoration:none;
    filter:brightness(1.1);
}`;

const Login = () => (
  <StyledLoginContainer>
    <StyledLoginButton
      onClick={() => {
        getAccessToken();
      }}
      href={process.env.REACT_APP_SPOTIFY_APP_BASEURL_LOGIN}
    >
      Login
    </StyledLoginButton>
  </StyledLoginContainer>
);
export default Login;
