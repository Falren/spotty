import { createContext, useContext } from "react";

const SpotifyContext = createContext()

export default SpotifyContext

export const useSpotify = () => {
  return useContext(SpotifyContext) 
}
