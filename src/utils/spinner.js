import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      className="mt-72"
      timeout={30000} //3 secs
    />
  );
};

export default Spinner;
