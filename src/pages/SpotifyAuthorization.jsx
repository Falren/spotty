import { Button } from "@mui/material";

export const SpotifyAuthorization = () => {
  const handleAuthorization = () => {
  
    window.location.href = "http://localhost:3000/auth/spotify/callback"
  }
  
  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => handleAuthorization()}
      sx={{ ml: 1, minWidth: 0 }}
      aria-label="Send message"
    >
      AUTHORIZE
    </Button>
    )
}

