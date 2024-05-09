const Progress = ({ width }: { width: number }) => {
  return (
    <div
      className="outer"
      style={{
        width: "100%",
        height: "14px",
        borderRadius: "3px",
        display: "flex",
        alignItems: "center",
        border: "solid 1px ",
      }}
    >
      <div
        className="inner"
        style={{
          width: `${width}%`,
          height: "10px",
          backgroundColor: "#f2be22",
        }}
      ></div>
    </div>
  );
};

export default Progress;
