import Grid from "../components/grid";

export default function Arena() {
  return (
    <div className=" flex flex-col  justify-center gap-12">
      <div className=" ml-10 mr-10 outline outline-gray-400 h-10 rounded-sm"></div>
      <div className="w-[650px]  flex justify-center">
        {/* <Grid /> */}
      </div>
    </div>
  );
}
