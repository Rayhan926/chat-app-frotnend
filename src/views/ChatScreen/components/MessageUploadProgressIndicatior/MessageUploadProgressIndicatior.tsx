import CircularProgress from '@components/CircularProgress';
import { colors } from '@config/constants';
import { MessageUploadProgressIndicatiorProps } from '@types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MessageUploadProgressIndicatior = ({
  percentage,
}: MessageUploadProgressIndicatiorProps) => {
  return (
    <div className="absolute rounded-xl overflow-hidden top-0 left-0 w-full h-full bg-dark-900/50 flex justify-center items-center text-white z-50">
      <div className="w-[50px]">
        {percentage === null ? (
          <CircularProgress strokeWidth={3} className="text-white" size={50} />
        ) : (
          <CircularProgressbar
            value={percentage}
            strokeWidth={5}
            text={`${percentage}%`}
            styles={{
              path: {
                stroke: colors.primary,
              },
              text: {
                fontSize: '25px',
                fill: 'white',
                transform: 'translateY(2px)',
              },
              trail: {
                stroke: 'rgba(255,255,255,0.7)',
              },
              background: {
                background: 'red',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MessageUploadProgressIndicatior;
