import axios from "axios";

const GET = {
  quationsNum: (ID) => axios.get(`https://opentdb.com/api.php?amount=${ID}`)
}

export default GET;
