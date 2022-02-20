import Room from "../components/video/Room.component";
import { useRouter } from "next/router";
import {
  Preview,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/hms-video-react";

const Video = ({ user }) => {
  const actions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      {isConnected ? (
        <Room />
      ) : (
        <Preview
          config={{ userName: user?.name, authToken: router.query.token }}
          joinOnClick={() =>
            actions.join({
              userName: user?.name,
              authToken: router.query.token,
            })
          }
        />
      )}
    </div>
  );
};

export default Video;
