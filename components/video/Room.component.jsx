import {
  useHMSStore,
  selectPeers,
  VideoList,
  ControlBar,
  useHMSActions,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from '@100mslive/hms-video-react';
import { useRouter } from 'next/router';

const Room = () => {
  const actions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const router = useRouter();

  const toggleAudio = async () => {
    await actions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const toggleVideo = async () => {
    await actions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const peers = useHMSStore(selectPeers);

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-5/6">
        <VideoList
          classes={{
            video: 'rounded-lg shadow-lg',
          }}
          maxTileCount={3}
          peers={peers}
          width="100%"
        />
      </div>
      <div className="">
        <ControlBar
          videoButtonOnClick={toggleVideo}
          audioButtonOnClick={toggleAudio}
          leaveButtonOnClick={() => {
            actions.leave();
            router.push('/home');
          }}
        />
      </div>
    </div>
  );
};

export default Room;
