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

    const userData = response.data.data.user;

    if (!userData) {
        throw new Error(`\n Can't find "${username}". \nPlease check if GITHUB_USERNAME is correct and ensure it is a "personal account" rather than an "organization account".`);
    }

    return userData.contributionsCollection.contributionCalendar.weeks;
}

export default fetchContributions;