import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials : true});

      dispatch(addFeed(res.data));
      // console.log("feed", res?.data)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
     getFeed()
  },[])
  return feed && (
    <div className="flex justify-center my-10">
    <  UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
