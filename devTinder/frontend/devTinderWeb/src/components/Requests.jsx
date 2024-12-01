import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store)=> store.requests)
  const dispatch = useDispatch();

const reviewRequest = async (status, _id) =>{
 try{
  const res = await axios.post(BASE_URL+ "/request/review/" + status + "/" + _id, {} , {withCredentials: true})

  dispatch(removeRequest(_id))
 }catch(error){
  console.log(error)
 }
}

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return null;

  if (requests.length === 0) return <h2 className="flex justify-center my-10">No Requests found</h2>;

  return (
    <div className="text-center my-10">
      <h2 className="text-bold text-white text-3xl">Requests </h2>

      {requests.map((request, index) => {
        const { _id, firstName, lastName, age, photoUrl, gender, skills, about } =
        request.fromUserId;

        return (
          
          <div key={index} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
             {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
            <button className="btn btn-primary mx-2" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
            <button className="btn btn-secondary mx-2" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
