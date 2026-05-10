import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;

const query = `
{
  user(login: "${username}") {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
    }
  }
}
`;

async function fetchContributions() {
    const response = await axios.post(
        "https://api.github.com/graphql",
        { query },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.data.user
        .contributionsCollection
        .contributionCalendar
        .weeks;
}

export default fetchContributions;