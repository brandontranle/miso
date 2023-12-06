interface dateProps {
  date: String;
}

const Date: React.FC<dateProps> = ({ date }) => {
  return (
    <div className="date">
      <h3> {date} </h3>
    </div>
  );
};

export default Date;
