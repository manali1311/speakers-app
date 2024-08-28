import axios from "axios";

//Getting All Speakers
export const GetSpeakers = async () => {
  return axios.get(`${process.env.PUBLIC_URL}/speakers.json
    `);
};
