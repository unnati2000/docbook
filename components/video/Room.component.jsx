import {
  useHMSStore,
  selectLocalPeer,
  selectPeers,
} from "@100mslive/hms-video-react";
import Video from "./Video.component";
import ControlBar from "./ControlBar.component";

const Room = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);

  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-900 w-screen min-h-screen p-2 flex-wrap">
        {localPeer && <Video peer={localPeer} isLocal={true} />}
        {peers &&
          peers
            .filter((peer) => !peer.isLocal)
            .map((peer) => {
              return (
                <>
                  <Video isLocal={false} peer={peer} />
                </>
              );
            })}
      </div>
      <ControlBar />
    </div>
  );
};

export default Room;
