interface TimeZoneDropdownProps {
  handleTimezoneChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedTimezone: string;
}

const TimeZoneDropdown: React.FC<TimeZoneDropdownProps> = ({
  handleTimezoneChange,
  selectedTimezone,
}) => {
  return (
    <div className="timezone-dropdown">
      <select
        id="timezone-selector"
        onChange={handleTimezoneChange}
        value={selectedTimezone}
      >
        <option value="America/New_York">New York, North America</option>
        <option value="America/Los_Angeles">Los Angeles, North America</option>
        <option value="America/Mexico_City">Mexico City, North America</option>
        <option value="America/Sao_Paulo">Sau Paulo, South America</option>
        <option value="America/Argentina/Buenos_Aires">
          Buenos Aires, South America
        </option>
        <option value="Europe/London">London, Europe</option>
        <option value="Europe/Paris">Paris, Europe</option>
        <option value="Asia/Tokyo">Tokyo, Asia</option>
        <option value="Asia/Shanghai">Shanghai, Asia</option>
        <option value="Asia/Singapore">Singapore, Asia</option>
        <option value="Africa/Lagos">Lagos, Africa</option>
        <option value="Africa/Cairo">Cairo, Africa</option>
        <option value="Australia/Sydney">Sydney, Oceania</option>
        <option value="Pacific/Auckland">Auckland, Oceania</option>
        <option value="Pacific/Honolulu">Honolulu, Oceania</option>
      </select>
    </div>
  );
};

export default TimeZoneDropdown;
