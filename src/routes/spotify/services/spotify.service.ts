import axios from "axios";

export class SpotifyService{
  constructor(){}
  async getTopTraks({params, headers}:any){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.spotify.com/v1/me/top/tracks',
      headers,
      params
    };

    const topTracksResponse = await axios.request(config)
      .catch((error) => {
        console.log(error);
      });
    console.log(topTracksResponse?.data)
  }
}