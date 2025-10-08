import "../css/Bar.scss";

const Bar = ({ progress, goal = 10000 }) => {
  const percentage = Math.min((progress / goal) * 100, 100);
  const remaining = goal - progress;

  const getColor = () => {
    if (progress < goal * 0.4) return "#ff0000";
    if (progress < goal * 0.7) return "#ffa500";
    return "#2ecc71";
  };

  return (
    <div className="bar-container">
      <div className="progress-labels">
        <strong>{progress}</strong>
        <span>{goal}</span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        ></div>
      </div>
    </div>
  );
};

export default Bar;
