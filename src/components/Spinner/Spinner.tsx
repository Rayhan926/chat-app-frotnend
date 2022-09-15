import CircularProgress from '@components/CircularProgress';

const Spinner = () => {
  return (
    <div className="h-full flex justify-center items-center text-primary">
      <CircularProgress size={30} />
    </div>
  );
};

export default Spinner;
