import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res?.data?.data)
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <h2>No connections found</h2>;

  return (
    <div className="text-center my-10">
      <h2 className="text-bold text-white text-3xl">Connections </h2>

      {connections.map((connection, index) => {
        const { firstName, lastName, age, photoUrl, gender, skills, about } =
          connection;

        return (
          
          <div key={index} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
